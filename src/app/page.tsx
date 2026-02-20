import Image from "next/image";

function GoogleLoginButton() {
  return (
    <button
      className="flex h-[56px] w-full max-w-[342px] items-center justify-center gap-3 rounded-xl bg-accent px-5 cursor-pointer transition-transform active:scale-[0.98] hover:brightness-110"
      type="button"
    >
      <div className="flex size-8 items-center justify-center rounded-full bg-white shadow-sm">
        <Image
          src="/icons/google-logo.svg"
          alt="Google"
          width={20}
          height={20}
        />
      </div>
      <span className="text-base font-bold tracking-wide text-[#0d0d0d]">
        Google 계정으로 시작하기
      </span>
    </button>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center bg-[#0d0d0d]">
      {/* Hero Section */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-24">
        <div className="flex flex-col items-center gap-4">
          {/* Logo Icon */}
          <div className="mb-8">
            <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 shadow-lg backdrop-blur-sm">
              <Image
                src="/icons/chart-icon.svg"
                alt="Stocky Logo"
                width={40}
                height={48}
                className="rotate-180"
              />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-center text-4xl font-black leading-[45px] tracking-tight text-white">
            나만을 위한
            <br />
            AI 주식 애널리스트
            <br />
            <span className="text-accent">Stocky</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-2 max-w-[320px] text-center text-base font-medium leading-relaxed text-gray-400">
            매일 아침 전달되는 맞춤형 데일리
            <br />
            브리핑으로 시장의 흐름을 파악하세요.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="flex w-full flex-col items-center gap-[18px] px-6 pb-[104px]">
        <GoogleLoginButton />

        {/* Terms */}
        <p className="text-center text-xs text-gray-500">
          계속 진행 시 Stocky의
          <br />
          <a href="/terms" className="underline decoration-gray-600">
            이용약관
          </a>
          {" "}및{" "}
          <a href="/privacy" className="underline decoration-gray-600">
            개인정보 처리방침
          </a>
          에 동의하게 됩니다.
        </p>
      </div>
    </div>
  );
}
