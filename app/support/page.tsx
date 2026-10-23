import { ArrowRight, CircleHelp, Clock3, Mail, MessageCircle, Phone, ShieldCheck, ShoppingBag } from "lucide-react";

const faqs = [
 { q: "كيف أتواصل مع خدمة العملاء؟", a: "يمكنك مراسلتنا عبر البريد الإلكتروني أو الاتصال على رقم الهاتف الموضح في هذه الصفحة. عند التواصل، اذكر اسمك وطريقة التواصل المناسبة وموضوع الاستفسار." },
 { q: "كيف أعدّل بياناتي؟", a: "افتح «حسابي» من المتجر، عدّل الاسم ورقم الهاتف والبريد الإلكتروني والعنوان والمحافظة، ثم اضغط «حفظ بيانات الحساب»." },
 { q: "هل يتم إرسال الطلب إلى المتجر؟", a: "في النسخة الحالية تُحفظ الطلبات على جهازك ولا تصل تلقائياً إلى نظام إدارة أو فريق تجهيز. لا تعتبر الطلب مؤكداً حتى تتواصل معنا ويؤكد فريق المتجر توفر المنتج والسعر والتوصيل." },
 { q: "كيف أطلب حذف بياناتي المحفوظة؟", a: "يمكنك مسح بيانات الموقع من إعدادات المتصفح. هذا يحذف بيانات الملف الشخصي والسلة والمفضلة والطلبات المخزنة محلياً على ذلك الجهاز." },
];

export default function SupportPage() {
 return <main dir="rtl" className="min-h-screen bg-[var(--background)] px-4 py-6 text-[var(--foreground)] sm:py-10">
  <div className="mx-auto max-w-4xl">
   <header className="mb-7 flex items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
    <a href="/obaid-store/" className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-800 font-black text-white"><ShoppingBag size={21}/></span><span><b dir="ltr" className="block text-lg">Obaid Store</b><small className="text-xs text-muted">متجر عبيد الإلكتروني</small></span></a>
    <a href="/obaid-store/" className="flex items-center gap-2 text-sm font-bold text-[var(--primary)]"><ArrowRight size={16}/> العودة للمتجر</a>
   </header>
   <section className="rounded-[26px] bg-gradient-to-l from-[#101827] to-[#245ab7] p-7 text-white sm:p-10"><span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/10"><CircleHelp size={25}/></span><p className="mt-5 text-xs font-bold text-sky-200">نحن هنا للمساعدة</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">خدمة العملاء</h1><p className="mt-3 max-w-2xl text-sm leading-8 text-slate-200">اختر وسيلة التواصل المناسبة، وأرسل تفاصيل استفسارك حتى نتمكن من مساعدتك بشكل أوضح.</p></section>
   <div className="my-5 grid gap-4 sm:grid-cols-3">
    <a href="mailto:UBEYDCUMA@gmail.com?subject=استفسار%20عن%20متجر%20عبيد" className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition hover:-translate-y-1 hover:border-[var(--primary)]"><span className="grid size-11 place-items-center rounded-xl bg-[var(--secondary)] text-[var(--primary)]"><Mail size={21}/></span><h2 className="mt-4 font-black">البريد الإلكتروني</h2><p className="mt-2 break-all text-sm text-muted">UBEYDCUMA@gmail.com</p><span className="mt-4 inline-block text-sm font-bold text-[var(--primary)]">إرسال رسالة ←</span></a>
    <a href="tel:+905357624482" className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition hover:-translate-y-1 hover:border-[var(--primary)]"><span className="grid size-11 place-items-center rounded-xl bg-[var(--secondary)] text-[var(--primary)]"><Phone size={21}/></span><h2 className="mt-4 font-black">الاتصال الهاتفي</h2><p dir="ltr" className="mt-2 text-right text-sm text-muted">+90 535 762 4482</p><span className="mt-4 inline-block text-sm font-bold text-[var(--primary)]">اتصل الآن ←</span></a>
    <a href="https://wa.me/905357624482?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D9%84%D8%AF%D9%8A%20%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D8%AA%D8%AC%D8%B1%20%D8%B9%D8%A8%D9%8A%D8%AF" target="_blank" rel="noreferrer" className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition hover:-translate-y-1 hover:border-[var(--primary)]"><span className="grid size-11 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600"><MessageCircle size={21}/></span><h2 className="mt-4 font-black">واتساب</h2><p className="mt-2 text-sm text-muted">مراسلة فريق المتجر</p><span className="mt-4 inline-block text-sm font-bold text-[var(--primary)]">فتح واتساب ←</span></a>
   </div>
   <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-7"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[var(--secondary)] text-[var(--primary)]"><CircleHelp size={20}/></span><div><h2 className="text-xl font-black">الأسئلة الشائعة</h2><p className="mt-1 text-sm text-muted">إجابات واضحة عن استخدام المتجر</p></div></div><div className="mt-5 divide-y divide-[var(--border)]">{faqs.map((faq,i)=><details key={faq.q} className="group py-4" open={i===0}><summary className="cursor-pointer list-none font-extrabold marker:hidden">{faq.q}<span className="float-left text-[var(--primary)] transition group-open:rotate-45">＋</span></summary><p className="mt-3 text-sm leading-7 text-muted">{faq.a}</p></details>)}</div></section>
   <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-300/50 bg-amber-50 p-4 text-sm leading-7 text-amber-950"><ShieldCheck size={20} className="mt-1 shrink-0"/><p>لحماية خصوصيتك، لا ترسل كلمات المرور أو بيانات البطاقات البنكية أو رموز التحقق عبر البريد أو المحادثات.</p></div>
   <p className="py-6 text-center text-xs text-muted">آخر تحديث: 23 أكتوبر 2026 · <a className="font-bold text-[var(--primary)]" href="/obaid-store/privacy/">سياسة الخصوصية</a> · <a className="font-bold text-[var(--primary)]" href="/obaid-store/terms/">شروط الاستخدام</a></p>
  </div>
 </main>;
}
