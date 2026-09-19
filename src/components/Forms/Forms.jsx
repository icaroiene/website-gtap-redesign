import { useRef, useState } from "react";
import { ACTIONS } from "../../data/event";
import "./Forms.css";

const ENDPOINT = "https://gtap.com.br/form-handler.php";
const TIMEOUT_MS = 15000;

// Estados: idle | sending | success | error
export const Forms = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return; // evita duplo envio

    const form = formRef.current;
    const formData = new FormData(form);
    // Garante as chaves esperadas pelo backend
    const payload = new FormData();
    payload.append("name", (formData.get("name") || "").toString().trim());
    payload.append("email", (formData.get("email") || "").toString().trim());
    payload.append("whatsapp", (formData.get("whatsapp") || "").toString().trim());

    setStatus("sending");
    setMessage("");

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: payload,
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (!res.ok) {
        setStatus("error");
        setMessage(
          "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp."
        );
        return;
      }
      setStatus("success");
      setMessage("Recebemos seu contato! Nossa equipe retornará em breve.");
      form.reset();
    } catch (err) {
      clearTimeout(timer);
      const timedOut = err?.name === "AbortError";
      setStatus("error");
      setMessage(
        timedOut
          ? "O envio demorou mais que o esperado. Verifique sua conexão e tente novamente."
          : "Falha de conexão. Tente novamente ou fale pelo WhatsApp."
      );
    }
  };

  const sending = status === "sending";

  return (
    <form className="lead-form" ref={formRef} onSubmit={handleSubmit}>
      <div className="lead-form__field">
        <label htmlFor="form-name">Nome</label>
        <input
          id="form-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Seu nome completo"
          required
        />
      </div>

      <div className="lead-form__field">
        <label htmlFor="form-email">E-mail</label>
        <input
          id="form-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="voce@exemplo.com.br"
          required
        />
      </div>

      <div className="lead-form__field">
        <label htmlFor="form-whatsapp">WhatsApp</label>
        <input
          id="form-whatsapp"
          name="whatsapp"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="(00) 00000-0000"
          required
        />
      </div>

      <button type="submit" className="btn btn--navy lead-form__submit" disabled={sending}>
        {sending ? "Enviando..." : "Quero informações"}
      </button>

      {/* Feedback acessível */}
      <p
        className={`lead-form__feedback lead-form__feedback--${status}`}
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {message}
      </p>

      <p className="lead-form__alt">
        Prefere falar agora?{" "}
        <a href={ACTIONS.contactUrl} target="_blank" rel="noopener noreferrer">
          Chamar no WhatsApp
        </a>
      </p>
    </form>
  );
};
