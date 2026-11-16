#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
語音旁白自動生成腳本
使用 Edge TTS 免費生成所有場景的語音檔案
"""

import asyncio
import os
import edge_tts

# 語音設定
VOICE = "zh-TW-HsiaoChenNeural"  # 女聲（溫暖親切）
# VOICE = "zh-TW-YunJheNeural"   # 男聲（沉穩可靠）
OUTPUT_DIR = "audio"

# 場景旁白文字
SCENE_TEXTS = [
    {
        "file": "voice_scene1.mp3",
        "text": "北端里里長候選人，呂佳穎，三代人守護的家"
    },
    {
        "file": "voice_scene2.mp3",
        "text": "慈愛里，三代人的承諾。阿公陳朝見，慈愛里第一代里長"
    },
    {
        "file": "voice_scene3.mp3",
        "text": "用50年的歲月，守護每一條巷弄，照顧每一個鄰居"
    },
    {
        "file": "voice_scene4.mp3",
        "text": "爸爸呂南風接下這份責任，他教我什麼是真心為里民服務"
    },
    {
        "file": "voice_scene5.mp3",
        "text": "他們用行動告訴我，服務不是口號，是一輩子的陪伴"
    },
    {
        "file": "voice_scene6.mp3",
        "text": "從他手中，我接下這份使命，不只是延續，更是承諾"
    },
    {
        "file": "voice_scene7.mp3",
        "text": "現在，換我來延續這份承諾。颱風、髒亂、困難，我都會第一時間出現"
    },
    {
        "file": "voice_scene8.mp3",
        "text": "颱風天，里民的安全是我的責任。無畏風雨，堅守家園"
    },
    {
        "file": "voice_scene9.mp3",
        "text": "每個鄰居的需要，都是我最在乎的事"
    },
    {
        "file": "voice_scene10.mp3",
        "text": "北端里的未來，讓我繼續守護。推薦呂佳穎，2026年11月，里長選舉"
    }
]


async def generate_voice(text, output_file):
    """生成單個語音檔案"""
    communicate = edge_tts.Communicate(text, VOICE)
    output_path = os.path.join(OUTPUT_DIR, output_file)
    
    print(f"生成中: {output_file}...")
    await communicate.save(output_path)
    print(f"✓ 完成: {output_file}")


async def main():
    """主程式"""
    # 建立輸出資料夾
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        print(f"已建立資料夾: {OUTPUT_DIR}/")
    
    print(f"\n使用語音: {VOICE}")
    print(f"開始生成 {len(SCENE_TEXTS)} 個語音檔案...\n")
    
    # 生成所有語音
    for scene in SCENE_TEXTS:
        try:
            await generate_voice(scene["text"], scene["file"])
        except Exception as e:
            print(f"✗ 錯誤: {scene['file']} - {str(e)}")
    
    print(f"\n完成！所有語音檔案已儲存在 {OUTPUT_DIR}/ 資料夾中")
    print("\n提示：")
    print("1. 請檢查生成的語音檔案")
    print("2. 開啟 preview.html 測試效果")
    print("3. 如需調整語速或音調，請參考 VOICE_GUIDE.md")


if __name__ == "__main__":
    # 檢查是否已安裝 edge-tts
    try:
        import edge_tts
    except ImportError:
        print("錯誤：未安裝 edge-tts")
        print("\n請執行以下命令安裝：")
        print("  pip install edge-tts")
        print("\n或使用 PowerShell（Windows）：")
        print("  py -m pip install edge-tts")
        exit(1)
    
    # 執行生成
    asyncio.run(main())
