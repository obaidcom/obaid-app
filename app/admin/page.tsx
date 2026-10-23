"use client";

import { useEffect, useState } from "react";
import {
  Activity, ArrowDownLeft, ArrowUpLeft, Bell, Check, ChevronLeft, CircleDollarSign,
  ClipboardList, CreditCard, Gauge, Globe2, LayoutDashboard, Menu, Package,
  Save, Settings2, ShieldCheck, ShoppingBag, Truck, Users, X
} from "lucide-react";

type Tab = "overview" | "store" | "shipping" | "payments" | "notifications";
type StoreSettings = {
  storeName: string; supportPhone: string; supportEmail: string; currency: string;
  shippingFee: string; freeShippingFrom: string; governorates: string;
  paymentCod: boolean; paymentSham: boolean; paymentSyriatel: boolean; paymentMtn: boolean;
  announcement: string; orderNotifications: boolean; lowStockAlerts: boolean;
};
const initialSettings: StoreSettings = {
  storeName: "متجر عبيد الإلكتروني", supportPhone: "", supportEmail: "",
  currency: "ل.س", shippingFee: "0", freeShippingFrom: "0",
  governorates: "دمشق، ريف دمشق، حلب، حمص، حماة، اللاذقية، طرطوس، إدلب، درعا، السويداء، دير الزور، الرقة، الحسكة، القنيطرة",
  paymentCod: true, paymentSham: false, paymentSyriatel: false, paymentMtn: false,
  announcement: "أهلاً بكم في متجر عبيد الإلكتروني", orderNotifications: true, lowStockAlerts: true
};
const tabs: { id: Tab; label: string; icon: typeof Gauge }[] = [
  { id: "overview", label: "نظرة عامة", icon: LayoutDashboard },
  { id: "store", label: "إعدادات المتجر", icon: Settings2 },
  { id: "shipping", label: "الشحن والتوصيل", icon: Truck },
  { id: "payments", label: "طرق الدفع", icon: CreditCard },
  { id: "notifications", label: "الإشعارات", icon: Bell }
];

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [settings, setSettings] = useState<StoreSettings>(initialSettings);
  const [saved, setSaved] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("obaid-store-admin-settings-v1");
      if (stored) setSettings({ ...initialSettings, ...JSON.parse(stored) });
    } catch {}
    setHydrated(true);
  }, []);

  const update = <K extends keyof StoreSettings>(key: K, value: StoreSettings[K]) => {
    setSettings(current => ({ ...current, [key]: value }));
    setSaved(false);
  };
  const save = () => {
    try {
      localStorage.setItem("obaid-store-admin-settings-v1", JSON.stringify(settings));
      setSaved(true);
    } catch { setSaved(false); }
  };
  const active = tabs.find(item => item.id === tab) || tabs[0];

  const Field = ({ label, value, onChange, placeholder, type = "text", hint }: {
    label: string; value: string; onChange: (v: string) => void;
    placeholder?: string; type?: string; hint?: string;
  }) => <label className="grid gap-2 text-sm">
    <span className="font-bold text-[var(--foreground)]">{label}</span>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--ring)]" />
    {hint && <span className="text-xs leading-5 text-[var(--muted-foreground)]">{hint}</span>}
  </label>;

  const Toggle = ({ label, description, checked, onChange }: {
    label: string; description: string; checked: boolean; onChange: (v: boolean) => void;
  }) => <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-[var(--border)] p-4">
    <span className="grid gap-1"><span className="text-sm font-extrabold">{label}</span><span className="text-xs leading-5 text-[var(--muted-foreground)]">{description}</span></span>
    <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="size-5 accent-blue-600" />
  </label>;

  return <main dir="rtl" className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileMenu(v => !v)} className="flex size-10 items-center justify-center rounded-xl border border-[var(--border)] lg:hidden" aria-label="القائمة">{mobileMenu ? <X size={20}/> : <Menu size={20}/>}</button>
          <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-700 text-white shadow-lg"><ShoppingBag size={22}/></span>
          <div><p className="font-black">متجر عبيد</p><p className="text-xs text-[var(--muted-foreground)]">لوحة الإدارة</p></div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-bold text-amber-500 sm:inline-flex">وضع التجهيز</span>
          <a href="./" className="flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] px-3 text-xs font-bold hover:bg-[var(--muted)]"><Globe2 size={16}/> عرض المتجر</a>
        </div>
      </div>
    </header>

    <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className={`${mobileMenu ? "block" : "hidden"} border-b border-[var(--border)] bg-[var(--card)] p-4 lg:block lg:min-h-[calc(100vh-72px)] lg:border-b-0 lg:border-l`}>
        <div className="mb-5 rounded-2xl border border-blue-400/20 bg-blue-500/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-blue-500"><ShieldCheck size={18}/><span className="text-sm font-black">مساحة الإدارة</span></div>
          <p className="text-xs leading-6 text-[var(--muted-foreground)]">هذه واجهة أولية. تسجيل الدخول والصلاحيات وقاعدة البيانات ستُفعّل في مرحلة الربط.</p>
        </div>
        <nav className="grid gap-1.5">
          {tabs.map(item => { const Icon = item.icon; return <button key={item.id} onClick={() => { setTab(item.id); setMobileMenu(false); }} className={`flex h-12 items-center gap-3 rounded-xl px-4 text-sm font-bold transition ${tab === item.id ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md" : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"}`}><Icon size={18}/>{item.label}{tab === item.id && <ChevronLeft className="mr-auto" size={16}/>}</button>; })}
        </nav>
        <div className="mt-8 rounded-xl border border-[var(--border)] p-4">
          <div className="mb-2 flex items-center gap-2 text-emerald-500"><Activity size={17}/><span className="text-xs font-extrabold">حالة المشروع</span></div>
          <p className="text-xs leading-5 text-[var(--muted-foreground)]">الواجهة جاهزة للتجربة. لا تُرسل طلبات أو مدفوعات حقيقية قبل إكمال الربط والاختبار.</p>
        </div>
      </aside>

      <section className="min-w-0 p-4 sm:p-6 lg:p-8">
        <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
          <div><p className="mb-2 text-xs font-bold text-[var(--primary)]">إدارة المتجر / {active.label}</p><h1 className="text-2xl font-black sm:text-3xl">{tab === "overview" ? "أهلاً بك في لوحة الإدارة" : active.label}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)]">{tab === "overview" ? "من هنا سنجهّز إعدادات متجر عبيد قبل ربطها بالبيانات الحقيقية." : "عدّل الخيارات المطلوبة، ثم احفظها للتجربة على هذا الجهاز."}</p></div>
          {tab !== "overview" && <button onClick={save} className="flex h-11 items-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-extrabold text-[var(--primary-foreground)] shadow-lg hover:brightness-105"><Save size={17}/>{saved ? "تم الحفظ" : "حفظ الإعدادات"}</button>}
        </div>

        {saved && <div role="status" className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm font-bold text-emerald-500"><Check size={18}/> حُفظت الإعدادات على هذا الجهاز فقط، ولم تُرسل إلى قاعدة البيانات بعد.</div>}

        {tab === "overview" && <div className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[{title:"المنتجات",value:"تجريبي",sub:"ستُربط بقاعدة البيانات",icon:Package},{title:"الطلبات",value:"تجريبي",sub:"لا توجد طلبات حقيقية بعد",icon:ClipboardList},{title:"العملاء",value:"قريباً",sub:"بعد إعداد تسجيل الدخول",icon:Users},{title:"المبيعات",value:"—",sub:"تظهر بعد ربط الطلبات",icon:CircleDollarSign}].map((item,i)=>{const Icon=item.icon;return <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm"><div className="mb-5 flex items-center justify-between"><span className="text-sm font-bold text-[var(--muted-foreground)]">{item.title}</span><span className="flex size-10 items-center justify-center rounded-xl bg-[var(--secondary)] text-[var(--primary)]"><Icon size={19}/></span></div><p className="text-2xl font-black">{item.value}</p><p className="mt-2 text-xs text-[var(--muted-foreground)]">{item.sub}</p></div>})}
          </div>
          <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6"><h2 className="mb-4 text-lg font-black">ابدأ إعداد متجرك</h2><div className="grid gap-3">{[{label:"بيانات المتجر والتواصل",desc:"اسم المتجر ورقم الدعم والبريد",id:"store" as Tab,icon:Settings2},{label:"المحافظات ورسوم التوصيل",desc:"حدد مناطق التوصيل والتكلفة",id:"shipping" as Tab,icon:Truck},{label:"طرق الدفع",desc:"تجهيز خيارات الدفع المتاحة في سوريا",id:"payments" as Tab,icon:CreditCard}].map(item=>{const Icon=item.icon;return <button key={item.id} onClick={()=>setTab(item.id)} className="flex items-center gap-3 rounded-xl border border-[var(--border)] p-4 text-right transition hover:border-[var(--primary)] hover:bg-[var(--muted)]"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--secondary)] text-[var(--primary)]"><Icon size={18}/></span><span className="min-w-0 flex-1"><span className="block text-sm font-extrabold">{item.label}</span><span className="mt-1 block text-xs text-[var(--muted-foreground)]">{item.desc}</span></span><ChevronLeft size={17}/></button>})}</div></div>
            <div className="rounded-2xl border border-amber-400/25 bg-amber-400/5 p-5 sm:p-6"><div className="mb-3 flex items-center gap-2 text-amber-500"><ShieldCheck size={20}/><h2 className="font-black">مهم قبل الإطلاق</h2></div><ul className="grid gap-3 text-sm leading-6 text-[var(--muted-foreground)]"><li>• إنشاء مشروع Supabase مستقل للمتجر.</li><li>• تشغيل ملف قاعدة البيانات ومراجعة الجداول.</li><li>• تأمين صلاحيات المدير وحسابات العملاء.</li><li>• اختبار الطلبات قبل استقبال زبائن حقيقيين.</li></ul></div>
          </div>
        </div>}

        {tab === "store" && <div className="grid gap-5">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6"><h2 className="mb-5 font-black">البيانات الأساسية</h2><div className="grid gap-5 md:grid-cols-2"><Field label="اسم المتجر" value={settings.storeName} onChange={v=>update("storeName",v)} placeholder="متجر عبيد الإلكتروني"/><Field label="رقم خدمة العملاء" value={settings.supportPhone} onChange={v=>update("supportPhone",v)} placeholder="+963…" hint="أدخل رقم دعم تملكه ويمكن للعملاء التواصل معه."/><Field label="بريد خدمة العملاء" type="email" value={settings.supportEmail} onChange={v=>update("supportEmail",v)} placeholder="support@example.com"/><label className="grid gap-2 text-sm"><span className="font-bold">العملة المعروضة</span><select value={settings.currency} onChange={e=>update("currency",e.target.value)} className="h-12 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4"><option value="ل.س">الليرة السورية (ل.س)</option><option value="USD">الدولار الأمريكي (USD)</option><option value="TRY">الليرة التركية (TRY)</option></select></label></div></div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6"><h2 className="mb-4 font-black">رسالة الترحيب</h2><textarea value={settings.announcement} onChange={e=>update("announcement",e.target.value)} rows={3} className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-sm outline-none focus:border-[var(--primary)]" placeholder="رسالة تظهر في أعلى المتجر"/></div>
        </div>}

        {tab === "shipping" && <div className="grid gap-5">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6"><h2 className="mb-5 font-black">التوصيل داخل سوريا</h2><div className="grid gap-5 md:grid-cols-2"><Field label="رسوم التوصيل" value={settings.shippingFee} onChange={v=>update("shippingFee",v)} type="number" hint="تُحفظ كإعداد مبدئي، ولن تتغير أسعار المتجر حتى نربطها."/><Field label="توصيل مجاني عند تجاوز مبلغ" value={settings.freeShippingFrom} onChange={v=>update("freeShippingFrom",v)} type="number" hint="ضع 0 لتعطيل حد التوصيل المجاني."/></div><label className="mt-5 grid gap-2 text-sm"><span className="font-bold">المحافظات المتاحة للتوصيل</span><textarea rows={5} value={settings.governorates} onChange={e=>update("governorates",e.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 leading-7 outline-none focus:border-[var(--primary)]"/><span className="text-xs text-[var(--muted-foreground)]">اكتب المحافظات مفصولة بفواصل. يجب التأكد من تغطية شركة التوصيل لكل منطقة.</span></label></div>
          <div className="rounded-2xl border border-blue-400/20 bg-blue-500/5 p-4 text-sm leading-6 text-[var(--muted-foreground)]"><Truck className="mb-2 text-blue-500" size={20}/> لا يوجد حتى الآن ربط بشركة شحن أو تتبع طرود؛ هذه إعدادات تحضيرية فقط.</div>
        </div>}

        {tab === "payments" && <div className="grid gap-4">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6"><h2 className="mb-2 font-black">طرق الدفع المقترحة</h2><p className="mb-5 text-sm leading-6 text-[var(--muted-foreground)]">فعّل فقط الطريقة التي تستطيع استقبال مدفوعاتها فعلياً. الخيارات هنا لا تنشئ حساب تاجر ولا تؤكد أي تحويل.</p><div className="grid gap-3">{[{key:"paymentCod" as const,label:"الدفع عند الاستلام",desc:"يُحصّل المبلغ عند تسليم الطلب"},{key:"paymentSham" as const,label:"شام كاش",desc:"يحتاج بيانات استقبال حقيقية وتعليمات تحويل موثقة"},{key:"paymentSyriatel" as const,label:"سيريتل كاش",desc:"يتطلب حساباً صالحاً وتحققاً يدوياً من التحويل"},{key:"paymentMtn" as const,label:"MTN كاش",desc:"يتطلب حساباً صالحاً وتحققاً يدوياً من التحويل"}].map(item=><Toggle key={item.key} label={item.label} description={item.desc} checked={settings[item.key]} onChange={v=>update(item.key,v)}/>)}</div></div>
          <div className="rounded-2xl border border-amber-400/25 bg-amber-400/5 p-4 text-sm leading-6 text-[var(--muted-foreground)]">تنبيه: الإعدادات محفوظة محلياً حالياً، ولا تغيّر طرق الدفع الظاهرة للزبائن. سنربطها لاحقاً بطريقة آمنة، ولن نعرض أرقام تحويل غير مؤكدة.</div>
        </div>}

        {tab === "notifications" && <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6"><h2 className="mb-2 font-black">تنبيهات الإدارة</h2><p className="mb-5 text-sm text-[var(--muted-foreground)]">إعدادات تنبيه مبدئية؛ إرسال إشعارات فعلية يحتاج إلى ربط خلفي آمن.</p><div className="grid gap-3"><Toggle label="تنبيه عند وصول طلب جديد" description="سيتم تفعيله عند ربط الطلبات وقناة الإشعارات." checked={settings.orderNotifications} onChange={v=>update("orderNotifications",v)}/><Toggle label="تنبيه انخفاض المخزون" description="مراقبة المنتجات التي تقترب من النفاد بعد ربط المخزون." checked={settings.lowStockAlerts} onChange={v=>update("lowStockAlerts",v)}/></div><div className="mt-5"><Field label="رسالة الإعلان أعلى المتجر" value={settings.announcement} onChange={v=>update("announcement",v)} placeholder="أهلاً بكم في متجر عبيد"/></div></div>}

        {tab !== "overview" && <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4"><p className="text-xs leading-5 text-[var(--muted-foreground)]">الحفظ الحالي على هذا المتصفح فقط. لا تشارك كلمات المرور أو مفاتيح Supabase السرية.</p><button onClick={save} className="flex h-11 items-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-extrabold text-[var(--primary-foreground)]"><Save size={17}/>{saved ? "تم الحفظ" : "حفظ الإعدادات"}</button></div>}
        <footer className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border)] pt-5 text-xs text-[var(--muted-foreground)]"><span>© {new Date().getFullYear()} متجر عبيد الإلكتروني</span><span className="flex items-center gap-1"><ShieldCheck size={14}/> واجهة الإدارة — مرحلة التجهيز</span></footer>
      </section>
    </div>
  </main>;
}
