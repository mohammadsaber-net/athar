export default function PrivacyPolicy() {
  return (
    <section className="relative py-16 px-4 bg-[#fdfaf3]">

      {/* background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('/pattern-green.png')] bg-repeat"></div>

      <div className="relative max-w-3xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-bold text-center text-emerald-900 mb-8">
          سياسة الخصوصية
        </h1>

        <div className="bg-white border border-emerald-100 shadow-sm rounded-xl p-6 space-y-6 leading-loose text-gray-800">

          <p>
            خصوصيتك مهمة لنا 🤍
          </p>

          <p>
            يهدف هذا الموقع إلى تقديم محتوى دعوي هادف من خلال أسماء الله الحسنى، والآيات القرآنية، والسنن المهجورة، مع إتاحة مساحة للتأمل والتفاعل.
          </p>

          <div>
            <h2 className="text-emerald-800 font-semibold mb-1">📌 المعلومات التي يتم جمعها</h2>
            <p>
              قد نقوم بجمع بعض البيانات البسيطة مثل الاسم أو البريد الإلكتروني عند استخدامك لنموذج التواصل أو التعليقات، وذلك بهدف تحسين الخدمة والتفاعل.
            </p>
          </div>

          <div>
            <h2 className="text-emerald-800 font-semibold mb-1">💬 التعليقات</h2>
            <p>
              يمكن للمستخدمين ترك تعليقاتهم على المحتوى، ويتم عرضها بشكل علني بعد مراجعتها.
            </p>
          </div>

          <div>
            <h2 className="text-emerald-800 font-semibold mb-1">🔔 الإشعارات</h2>
            <p>
              في حال تفعيل الإشعارات، قد يتم استخدام بيانات تقنية بسيطة لإرسال التحديثات الجديدة لك.
            </p>
          </div>

          <div>
            <h2 className="text-emerald-800 font-semibold mb-1">🚫 حماية البيانات</h2>
            <p>
              نحن لا نقوم ببيع أو مشاركة بياناتك مع أي طرف ثالث.
            </p>
          </div>

          <p className="pt-4 border-t text-center text-gray-600">
            باستخدامك لهذا الموقع، فإنك توافق على سياسة الخصوصية هذه.
          </p>
          <p className="text-center italic text-gray-500">
            نسأل الله أن يبارك في هذا العمل ويجعله خالصًا لوجهه الكريم 🤍
          </p>

        </div>
      </div>
    </section>
  );
}