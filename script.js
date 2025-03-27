let currentAudio = null; // 現在再生中の音声を保持

// すべての再生ボタンにイベントを追加
document.querySelectorAll(".playButton").forEach(button => {
    button.addEventListener("click", () => {
        const soundFile = button.getAttribute("data-sound"); // data-sound の値を取得

        // すでに音が再生中なら停止
        if (currentAudio) {
            currentAudio.pause(); // 再生中の音声を停止
            currentAudio.currentTime = 0; // 再生位置を最初に戻す
        }

        // 新しい音声を作成して再生
        currentAudio = new Audio(soundFile); // 新しい音声を作成
        currentAudio.volume = document.getElementById("volumeControl").value; // 現在の音量を適用
        currentAudio.play(); // 音声を再生
    });
});

// 音量調整スライダーの処理
document.getElementById("volumeControl").addEventListener("input", (event) => {
    if (currentAudio) {
        currentAudio.volume = event.target.value; // 音量スライダーの値を音量に即反映
    }
});
