// ARQUIVO FINAL E SIMPLIFICADO: supabase/functions/payment-webhook/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.40.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // O request OPTIONS é importante para o CORS e deve ser mantido
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = "https://rmznrafianrqxlefkjuu.supabase.co";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // A verificação de TOKEN foi REMOVIDA pois a Kirvano não a envia no header.
    console.log("Webhook da Kirvano recebido. Processando...");

    const payload = await req.json();
    console.log("Evento recebido:", payload.event);

    if (payload.event === "SALE_APPROVED") {
      const saleData = payload;
      const customerEmail = saleData.customer?.email;
      const paymentReference = saleData.sale_id;

      if (!customerEmail) {
        console.error("Webhook de 'SALE_APPROVED' sem o e-mail do cliente.");
        return new Response(
          JSON.stringify({ received: true, message: "No email" }),
          { status: 200 }
        );
      }

      // Lógica para atualizar o banco de dados (permanece a mesma)
      const { data, error } = await supabase
        .from("love_notes")
        .update({
          is_paid: true,
          payment_reference: paymentReference,
        })
        .eq("user_email", customerEmail)
        .eq("is_paid", false)
        .order("created_at", { ascending: false })
        .limit(1)
        .select();

      if (error) {
        console.error(
          `Erro ao atualizar a nota para o email ${customerEmail}:`,
          error
        );
      } else if (data && data.length > 0) {
        console.log(
          `Pagamento confirmado com sucesso para a nota com slug: ${data[0].slug}`
        );
      } else {
        console.warn(
          `Nenhuma nota não paga encontrada para o email: ${customerEmail}`
        );
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro no processamento do webhook:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
