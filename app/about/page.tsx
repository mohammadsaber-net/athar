
export default function About() {
  return (
    <section className="relative py-16 min-h-screen px-4 bg-[#fdfaf3] dark:bg-[#0b1220] transition-colors duration-500">
      <div className="absolute inset-0 opacity-10 dark:opacity-[0.03] bg-[url('/pattern.png')] bg-repeat"></div>
      
      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 dark:text-emerald-400 mb-6 transition-colors">
          عن الموقع
        </h2>
        
        <p className="text-lg leading-loose text-gray-800 dark:text-gray-200 mb-6">
          في هذا الموقع نسعى إلى أن تكون لك وقفات هادئة مع معاني الإيمان،
          من خلال عرض أسماء الله الحسنى، والتأمل في آيات من كتاب الله،
          وإحياء السنن المهجورة في حياتنا اليومية.
        </p>
        
        <p className="text-lg leading-loose text-gray-700 dark:text-gray-300 mb-6">
          هدفنا ليس كثرة المحتوى، بل أثره في القلب…
          أن تقرأ فتتفكر، وأن تتفكر فتعمل.
        </p>

        <div className="space-y-4 text-right">
          {/* كارت: شارك بتأملاتك */}
          <div className="bg-white dark:bg-[#161b22] border border-emerald-100 dark:border-emerald-900/40 rounded-xl p-5 shadow-sm hover:shadow-md dark:shadow-none transition-all group">
            <h3 className="text-emerald-800 dark:text-emerald-400 font-semibold mb-2 flex items-center group-hover:text-green-600 dark:group-hover:text-green-400 gap-2">
              <span className="text-xl">💬</span>
              شارك بتأملاتك
            </h3>
            <p className="text-gray-700 dark:text-gray-400 text-sm md:text-base leading-relaxed">
              يمكنك التعليق على أي محتوى وكتابة خواطرك وتأملاتك لتكون صدقة جارية لك.
            </p>
          </div>

          {/* كارت: تابع كل جديد */}
          <div className="bg-white dark:bg-[#161b22] border border-emerald-100 dark:border-emerald-900/40 rounded-xl p-5 shadow-sm hover:shadow-md dark:shadow-none transition-all group">
            <h3 className="text-emerald-800 dark:text-emerald-400 font-semibold mb-2 flex items-center group-hover:text-green-600 dark:group-hover:text-green-400 gap-2">
              <span className="text-xl">🔔</span>
              تابع كل جديد
            </h3>
            <p className="text-gray-700 dark:text-gray-400 text-sm md:text-base leading-relaxed">
              فعّل الإشعارات ليصلك كل ما يُنشر أولاً بأول بإذن الله.
            </p>
          </div>

          <a 
            href="https://wa.me/201023966702" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block bg-white dark:bg-[#161b22] border border-emerald-100 dark:border-emerald-900/40 rounded-xl p-5 shadow-sm hover:shadow-md dark:shadow-none transition-all group"
          >
            <h3 className="text-emerald-800 dark:text-emerald-400 font-semibold mb-2 flex items-center gap-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              <span className="text-xl">📱</span>
              تواصل معنا
            </h3>
            <p className="text-gray-700 dark:text-gray-400 text-sm md:text-base leading-relaxed">
              كما يمكنك التواصل معي علي واتساب لعرض أفكار أو تحسينات ع الموقع: 
              <span className="font-mono font-semibold mx-1 text-emerald-900 dark:text-emerald-300">01023966702</span>
            </p>
          </a>
        </div>

        <p className="mt-10 text-gray-600 dark:text-gray-300 italic transition-colors">
          نسأل الله أن ينفعنا وإياكم بما نقرأ ونسمع 🤍
        </p>
      </div>
    </section>
  );
}