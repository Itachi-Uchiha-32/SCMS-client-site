// src/components/FAQ.jsx
import { useState } from "react";

const faqs = [
  { question: "What is this website about?", answer: "This website helps you with gardening tips, weather updates, and more." },
  { question: "How do I share my tips?", answer: "You can go to the 'Share Tip' section after logging in." },
  { question: "Can I edit my tips later?", answer: "Yes, go to 'My Tips' to edit or delete your tips." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg shadow-sm">
            <button
              className="w-full text-left px-4 py-3 font-medium flex justify-between items-center"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-2 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
