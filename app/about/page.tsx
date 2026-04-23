export default function About() {
  return (
    <section className="relative py-16 min-h-screen px-4 bg-[#fdfaf3]">
      <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] bg-repeat"></div>
      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-6">
          عن الموقع
        </h2>
        <p className="text-lg leading-loose text-gray-800 mb-6">
          في هذا الموقع نسعى إلى أن تكون لك وقفات هادئة مع معاني الإيمان،
          من خلال عرض أسماء الله الحسنى، والتأمل في آيات من كتاب الله،
          وإحياء السنن المهجورة في حياتنا اليومية.
        </p>
        <p className="text-lg leading-loose text-gray-700 mb-6">
          هدفنا ليس كثرة المحتوى، بل أثره في القلب…
          أن تقرأ فتتفكر، وأن تتفكر فتعمل.
        </p>
        <div className="space-y-4 text-right">
          <div className="bg-white border border-emerald-100 rounded-lg p-4 shadow-sm">
            <h3 className="text-emerald-800 font-semibold mb-1">
              💬 شارك بتأملاتك
            </h3>
            <p className="text-gray-700">
              يمكنك التعليق على أي محتوى وكتابة خواطرك وتأملاتك لتكون صدقة جارية لك.
            </p>
          </div>
          <div className="bg-white border border-emerald-100 rounded-lg p-4 shadow-sm">
            <h3 className="text-emerald-800 font-semibold mb-1">
              🔔 تابع كل جديد
            </h3>
            <p className="text-gray-700">
              فعّل الإشعارات ليصلك كل ما يُنشر أولاً بأول بإذن الله.
            </p>
          </div>
        </div>
        <p className="mt-8 text-gray-600 italic">
          نسأل الله أن ينفعنا وإياكم بما نقرأ ونسمع 🤍
        </p>
      </div>
    </section>
  );
}
