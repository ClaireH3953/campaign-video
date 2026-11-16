#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
競選影片語音生成腳本 - 新版溫暖日常風格
使用 edge-tts 生成台語語音
"""

import asyncio
import edge_tts
import os

# 語音設定
VOICE_NAME = "zh-TW-HsiaoChenNeural"  # 台灣女聲（溫暖親切）
OUTPUT_DIR = "audio"

# 新版旁白文稿（華語版 - edge-tts 支援）
SCRIPTS = {
    "voice_scene1.mp3": "我是呂佳穎，這是我的家，北端里。三代人，一起守護到今。",
    "voice_scene2.mp3": "阿公陳朝見，是慈愛里第一代里長。他教我，做里長，就是要做里民的厝邊。",
    "voice_scene3.mp3": "五十年的歲月，他每天都在巷仔內走動，認識每一個人，關心每一個家庭。",
    "voice_scene4.mp3": "後來，我爸爸呂南風接手。我從小就看著他，無論日時還是暗時，只要里民需要，他隨時都在。",
    "voice_scene5.mp3": "他告訴我，服務不是一份工作，是一輩子的承諾。對里民，要真心，要用心。",
    "voice_scene6.mp3": "現在，換我來延續這份責任。我知道，這不只是一個職位，是三代人對北端里的承諾。",
    "voice_scene7.mp3": "颱風來、路燈壞、垃圾堆積，無論什麼問題，我都會第一時間到現場。因為這裡是我的家，你們都是我的家人。",
    "voice_scene8.mp3": "去年十月颱風天，我整夜沒睡，巡視每一條街道，確保大家都平安。這就是我的工作。",
    "voice_scene9.mp3": "你們的聲音，我都聽到了。每一個建議，每一個需要，我都放在心裡。",
    "voice_scene10.mp3": "乾淨的環境，要靠我們一起維持。每個禮拜，我都會親自巡視，哪裡需要改善，我馬上處理。",
    "voice_scene11.mp3": "北端里的未來，我會繼續和大家一起打拼。呂佳穎，請您支持。2026年11月28號，里長選舉，拜託。",
}


async def generate_voice(text: str, output_file: str):
    """生成單個語音檔案"""
    try:
        communicate = edge_tts.Communicate(text, VOICE_NAME)
        await communicate.save(output_file)
        print(f"✅ 已生成: {output_file}")
        return True
    except Exception as e:
        print(f"❌ 生成失敗 {output_file}: {e}")
        return False


async def main():
    """主函數"""
    # 確保輸出目錄存在
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("🎙️ 開始生成語音檔案...")
    print(f"📁 輸出目錄: {OUTPUT_DIR}/")
    print(f"🔊 使用聲音: {VOICE_NAME}")
    print(f"📝 共 {len(SCRIPTS)} 個場景\n")

    # 生成所有語音
    tasks = []
    for filename, text in SCRIPTS.items():
        output_path = os.path.join(OUTPUT_DIR, filename)
        print(f"⏳ 正在生成: {filename}")
        print(f"   文字: {text[:50]}...")
        tasks.append(generate_voice(text, output_path))

    # 等待所有任務完成
    results = await asyncio.gather(*tasks)

    # 統計結果
    success_count = sum(results)
    print(f"\n{'=' * 50}")
    print(f"✅ 成功生成: {success_count}/{len(SCRIPTS)} 個檔案")
    print(f"📁 檔案位置: {os.path.abspath(OUTPUT_DIR)}/")
    print(f"{'=' * 50}\n")

    if success_count == len(SCRIPTS):
        print("🎉 所有語音檔案生成完成！")
        print("\n下一步:")
        print("1. 檢查 audio/ 資料夾中的 MP3 檔案")
        print("2. 告訴 OpenCode 更新 preview.html")
        print("3. 開啟 preview.html 測試影片")
    else:
        print("⚠️ 部分檔案生成失敗，請檢查錯誤訊息")


if __name__ == "__main__":
    # 檢查是否安裝 edge-tts
    try:
        import edge_tts

        print("✅ edge-tts 已安裝\n")
    except ImportError:
        print("❌ 未安裝 edge-tts，請先執行:")
        print("   pip install edge-tts")
        print("   或")
        print("   pip3 install edge-tts")
        exit(1)

    # 執行生成
    asyncio.run(main())
