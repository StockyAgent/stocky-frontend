"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomTabBar from "@/components/v2/BottomTabBar";

export default function V2MyPage() {
  const router = useRouter();
  const [isPushOn, setIsPushOn] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [profile, setProfile] = useState({
    emoji: "🧑‍💻",
    name: "스토키 유저",
    email: "user@stocky.ai"
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  return (
    <main className={`flex min-h-dvh flex-col transition-colors duration-300 ${isDark ? "bg-[#121212]" : "bg-[#f5faf7]"}`}>
      {/* 헤더 */}
      <header className={`flex items-center justify-between px-5 py-4 transition-colors duration-300 ${isDark ? "bg-[#1e1e1e] border-b border-[#333]" : "bg-white shadow-sm"}`}>
        <h1 className={`text-[20px] font-black transition-colors ${isDark ? "text-white" : "text-[#0f2318]"}`}>마이페이지</h1>
        <button 
          onClick={() => setIsDark(!isDark)}
          className={`flex size-10 items-center justify-center rounded-[13px] text-xl transition-colors ${isDark ? "bg-[#333] shadow-[0_3px_0_#222]" : "bg-[#e8f5ee] shadow-[0_3px_0_#d0e8d8]"}`}
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </header>

      {/* 내 프로필 카드 */}
      <section className={`mx-5 mt-4 flex items-center justify-between rounded-[20px] p-5 transition-colors duration-300 ${
        isDark ? "bg-[#1e1e1e] shadow-[0_6px_0_#111,0_8px_24px_rgba(0,0,0,0.5)]" : "bg-white shadow-[0_6px_0_#d0e8d8,0_8px_24px_rgba(0,0,0,0.06)]"
      }`}>
        <div className="flex items-center gap-4">
          <div className="flex size-[60px] shrink-0 items-center justify-center rounded-full bg-[#1cb863] text-2xl shadow-[0_3px_0_#159e51]">
            {profile.emoji}
          </div>
          <div>
            <h2 className={`text-[18px] font-black transition-colors ${isDark ? "text-white" : "text-[#0f2318]"}`}>{profile.name}</h2>
            <p className="text-[12px] text-[#8abeaa]">{profile.email}</p>
          </div>
        </div>
        <button
          className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-colors ${isDark ? "bg-[#333] active:bg-[#444]" : "bg-[#f0f5ec] active:bg-[#e0ead8]"}`}
          onClick={() => {
            setEditForm(profile);
            setIsEditModalOpen(true);
          }}
        >
          <span className="text-[14px]">✏️</span>
        </button>
      </section>

      {/* 메뉴 리스트 */}
      <section className="mx-5 mt-6 mb-24 flex flex-col gap-3">
        {/* 투자 코치 설정 */}
        <button
          type="button"
          onClick={() => router.push("/v2/coach?from=my")}
          className={`flex w-full items-center justify-between rounded-[16px] p-4 transition-all active:translate-y-0.5 ${
            isDark ? "bg-[#1e1e1e] shadow-[0_4px_0_#111] active:shadow-[0_1.5px_0_#111]" : "bg-white shadow-[0_4px_0_#e8f0ec] active:shadow-[0_1.5px_0_#e8f0ec]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`flex size-10 items-center justify-center rounded-[12px] text-lg transition-colors ${isDark ? "bg-[#2a2a2a] shadow-[0_2px_0_#111]" : "bg-[#e8fcf0] shadow-[0_2px_0_#d0e8d8]"}`}>
              🎯
            </div>
            <div className="text-left">
              <p className={`text-[14px] font-black transition-colors ${isDark ? "text-white" : "text-[#0f2318]"}`}>투자 코치 변경</p>
              <p className="text-[11px] text-[#8abeaa]">현재: 테크 트렌드 코치</p>
            </div>
          </div>
          <span className="text-[14px] font-black text-[#8abeaa]">›</span>
        </button>



        {/* 알림 설정 */}
        <div className={`flex w-full items-center justify-between rounded-[16px] p-4 transition-colors duration-300 ${
          isDark ? "bg-[#1e1e1e] shadow-[0_4px_0_#111]" : "bg-white shadow-[0_4px_0_#e8f0ec]"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`flex size-10 items-center justify-center rounded-[12px] text-lg transition-colors ${isDark ? "bg-[#2a2a2a] shadow-[0_2px_0_#111]" : "bg-[#fff5ea] shadow-[0_2px_0_#ffe0c0]"}`}>
              🔔
            </div>
            <div className="text-left">
              <p className={`text-[14px] font-black transition-colors ${isDark ? "text-white" : "text-[#0f2318]"}`}>오전 브리핑 알림</p>
              <p className="text-[11px] text-[#8abeaa]">매일 07:30 푸시 수신</p>
            </div>
          </div>
          {/* 토글 버튼 */}
          <div
            onClick={() => setIsPushOn(!isPushOn)}
            className={`flex h-[22px] w-[38px] cursor-pointer items-center rounded-full p-[2px] shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.1)] transition-colors duration-300 ${
              isPushOn ? "bg-[#1cb863] pr-0" : (isDark ? "bg-[#444] pl-[2px]" : "bg-[#e8f0ec] pl-[2px]")
            }`}
          >
            <div
              className={`size-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                isPushOn ? "translate-x-[15px]" : "translate-x-0"
              }`}
            />
          </div>
        </div>

        {/* 기타 하단 버튼들 */}
        <div className={`mt-4 flex flex-col gap-1 rounded-[16px] p-2 transition-colors duration-300 ${
          isDark ? "bg-[#1e1e1e] shadow-[0_4px_0_#111]" : "bg-white shadow-[0_4px_0_#e8f0ec]"
        }`}>
          <button onClick={() => router.push("/v2/notices")} className={`flex w-full items-center justify-between rounded-[12px] px-4 py-3 transition-colors ${isDark ? "active:bg-[#2a2a2a]" : "active:bg-[#f5faf7]"}`}>
            <span className={`text-[13px] font-bold transition-colors ${isDark ? "text-[#a0b8aa]" : "text-[#3d6b50]"}`}>공지사항</span>
            <span className="text-[12px] font-black text-[#8abeaa]">›</span>
          </button>
          <button onClick={() => router.push("/v2/terms")} className={`flex w-full items-center justify-between rounded-[12px] px-4 py-3 transition-colors ${isDark ? "active:bg-[#2a2a2a]" : "active:bg-[#f5faf7]"}`}>
            <span className={`text-[13px] font-bold transition-colors ${isDark ? "text-[#a0b8aa]" : "text-[#3d6b50]"}`}>서비스 이용약관</span>
            <span className="text-[12px] font-black text-[#8abeaa]">›</span>
          </button>
          <button className={`flex w-full items-center justify-between rounded-[12px] px-4 py-3 transition-colors ${isDark ? "active:bg-[#311]" : "active:bg-[#fcf0f0]"}`}>
            <span className="text-[13px] font-bold text-[#e84545]">로그아웃</span>
          </button>
        </div>
      </section>

      {/* 하단 탭바 */}
      <BottomTabBar isDark={isDark} />

      {/* 프로필 수정 모달 */}
      <div 
        className={`fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 ${
          isEditModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsEditModalOpen(false)}
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-md rounded-t-[24px] p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-300 delay-50 ${
            isEditModalOpen ? "translate-y-0" : "translate-y-full"
          } ${isDark ? "bg-[#1e1e1e]" : "bg-white"}`}
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className={`text-[18px] font-black ${isDark ? "text-white" : "text-[#0f2318]"}`}>프로필 수정</h3>
            <button onClick={() => setIsEditModalOpen(false)} className="text-xl text-[#8abeaa]">✕</button>
          </div>
          
          <div className="flex flex-col gap-4">
            <div>
              <label className={`block text-[12px] font-bold mb-1.5 ${isDark ? "text-[#a0b8aa]" : "text-[#3d6b50]"}`}>프로필 이모지</label>
              <input 
                type="text" 
                value={editForm.emoji} 
                onChange={(e) => setEditForm({ ...editForm, emoji: e.target.value })}
                className={`w-full rounded-[12px] px-4 py-3 text-[14px] outline-none transition-colors border ${isDark ? "border-[#333] bg-[#2a2a2a] text-white focus:border-[#1cb863]" : "border-[#e0e8e4] bg-[#f5faf7] text-[#0f2318] focus:border-[#1cb863]"}`}
              />
            </div>
            <div>
              <label className={`block text-[12px] font-bold mb-1.5 ${isDark ? "text-[#a0b8aa]" : "text-[#3d6b50]"}`}>이름</label>
              <input 
                type="text" 
                value={editForm.name} 
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className={`w-full rounded-[12px] px-4 py-3 text-[14px] outline-none transition-colors border ${isDark ? "border-[#333] bg-[#2a2a2a] text-white focus:border-[#1cb863]" : "border-[#e0e8e4] bg-[#f5faf7] text-[#0f2318] focus:border-[#1cb863]"}`}
              />
            </div>
            <div>
              <label className={`block text-[12px] font-bold mb-1.5 ${isDark ? "text-[#a0b8aa]" : "text-[#3d6b50]"}`}>이메일</label>
              <input 
                type="text" 
                value={editForm.email} 
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className={`w-full rounded-[12px] px-4 py-3 text-[14px] outline-none transition-colors border ${isDark ? "border-[#333] bg-[#2a2a2a] text-white focus:border-[#1cb863]" : "border-[#e0e8e4] bg-[#f5faf7] text-[#0f2318] focus:border-[#1cb863]"}`}
              />
            </div>
          </div>
          
          <button 
            onClick={() => { setProfile(editForm); setIsEditModalOpen(false); }}
            className={`mt-6 w-full rounded-[16px] px-5 py-4 text-[15px] font-black text-white transition-all active:translate-y-1 ${
              isDark ? "bg-[#1cb863] shadow-[0_5px_0_#159e51] active:shadow-none" : "bg-[#1cb863] shadow-[0_5px_0_#159e51] active:shadow-none"
            }`}
          >
            저장하기
          </button>
        </div>
      </div>
    </main>
  );
}
