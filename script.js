let currentAudio = null; // 現在再生中のオーディオ
let currentButton = null; // 現在再生中のボタン
let playlistIndex = 0;
let playlistAudio = null;
let isPlaylistPlaying = false;

// 音声を再生する関数
function playSound(button, soundFile) {
    // 同じ音声が再生中の場合は停止してから再生しなおす
    if (currentAudio && currentAudio.src.includes(soundFile)) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio.play().catch(error => {
            console.error('音声の再生に失敗しました:', error);
        });
        return;
    }

    // 他の音声を停止
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
        currentButton = null;
    }

    // 新しい音声を再生
    currentAudio = new Audio(soundFile);
    currentAudio.volume = document.getElementById('volumeControl').value;
    currentAudio.play().catch(error => {
        console.error('音声の再生に失敗しました:', error);
    });

    currentButton = button;
}

// タブの切り替え処理
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // すべてのタブから 'active' クラスを削除
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        // すべてのタブ内容から 'active' クラスを削除
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        // クリックしたタブに 'active' クラスを追加
        tab.classList.add('active');
        // 対応するタブ内容を表示
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});


// ボタンのデータを配列で定義
const buttonsData = [
    { name: "あぁよ", soundFile: "sounds/あぁよ.wav" },
    { name: "あよよよよよ", soundFile: "sounds/あよよよよよ.wav" },
    { name: "あよ", soundFile: "sounds/あよ.wav" },
    { name: "おんぎゃーーーー！！！", soundFile: "sounds/おんぎゃーーーー！！！.wav" },
    { name: "ｲﾃﾃﾞｷﾒｰｼｭ", soundFile: "sounds/ｲﾃﾃﾞｷﾒｰｼｭ.wav" },
    { name: "かんぱーい", soundFile: "sounds/かんぱーい.wav" },
    { name: "げっぷでる", soundFile: "sounds/げっぷでる.wav" },
    { name: "シンフォギア！！！", soundFile: "sounds/シンフォギア！！！.wav" },
    { name: "どrrrrr", soundFile: "sounds/どrrrrr.wav" },
    { name: "ドッスン", soundFile: "sounds/ドッスン.wav" },
    { name: "ドッスンもどき", soundFile: "sounds/ドッスンもどき.wav" },
    { name: "なにやってんだおめえ", soundFile: "sounds/なにやってんだおめえ.wav" },
    { name: "ユニコーーーーーーン！", soundFile: "sounds/ユニコーーーーーーン！.wav" },
    { name: "ユニコーンの方配信閉じて", soundFile: "sounds/ユニコーンの方配信閉じて.wav" },
    { name: "よ～", soundFile: "sounds/よ～.wav" },
    { name: "ﾜﾀｸｼは牛じゃねえ", soundFile: "sounds/ﾜﾀｸｼは牛じゃねえ.wav" },
    { name: "牛(発情期)", soundFile: "sounds/牛(発情期).wav" },
    { name: "合法種付おじさん", soundFile: "sounds/合法種付おじさん.wav" },
    { name: "初見様いらっしゃいませ", soundFile: "sounds/初見様いらっしゃいませ.wav" },
    { name: "喋れる歌える笑かせる", soundFile: "sounds/喋れる歌える笑かせる.wav" },
    { name: "民意なんでえ", soundFile: "sounds/民意なんでえ.wav" },
    { name: "鳴き声", soundFile: "sounds/鳴き声.wav" },
    { name: "お手を拝借", soundFile: "sounds/お手を拝借.wav" },
    { name: "アッ!!（絶叫）", soundFile: "sounds/アッ!!（絶叫）.wav" },
    { name: "いやあああ（絶叫）", soundFile: "sounds/いやあああ（絶叫）.wav" },
    { name: "サキュバス～", soundFile: "sounds/サキュバス～.wav" },
    { name: "ペトラナイトメアですわ～", soundFile: "sounds/ペトラナイトメアですわ～.wav" },
    { name: "ファビュラス～", soundFile: "sounds/ファビュラス～.wav" },
    { name: "初めまして", soundFile: "sounds/初めまして.wav" },
    { name: "台パン", soundFile: "sounds/台パン.wav" },
    { name: "皆さま～", soundFile: "sounds/皆さま～.wav" },
    { name: "おめでとう～", soundFile: "sounds/おめでとう～.wav" },
    { name: "よいしょ～", soundFile: "sounds/よいしょ～.wav" },
    { name: "３３２２１１", soundFile: "sounds/３３２２１１.wav" },
    { name: "くっさ！", soundFile: "sounds/くっさ！.wav" },
    { name: "うわぁくっさぁ", soundFile: "sounds/うわぁくっさぁ.wav" },
    { name: "ありえないんだけど", soundFile: "sounds/ありえないんだけど.wav" },
    { name: "OH YES!", soundFile: "sounds/OH YES!.wav" },
    { name: "優勝", soundFile: "sounds/優勝.wav" },
    { name: "うんっまああ", soundFile: "sounds/うんっまああ.wav" },
    { name: "Vtuberになったんだﾜﾀｸｼ", soundFile: "sounds/Vtuberになったんだﾜﾀｸｼ.wav" },
    { name: "う～～～～ん", soundFile: "sounds/う～～～～ん.wav" },
    { name: "んあぁ", soundFile: "sounds/んあぁ.wav" },
    { name: "ﾜﾀｸｼ", soundFile: "sounds/ﾜﾀｸｼ.wav" },
    { name: "脱げる", soundFile: "sounds/脱げる.wav" },
    { name: "ペッペッペ・ソーランアレマ", soundFile: "sounds/ペッペッペ・ソーランアレマ.wav" },
    { name: "と申します", soundFile: "sounds/と申します.wav" },
    { name: "こんぺっぺぺ～", soundFile: "sounds/こんぺっぺぺ～.wav" },
    { name: "歌える", soundFile: "sounds/歌える.wav" },
    { name: "入籍ですわ", soundFile: "sounds/入籍ですわ.wav" },
    { name: "あおらおら", soundFile: "sounds/あおらおら.wav" },
    { name: "牛がいる牛がいる", soundFile: "sounds/牛がいる牛がいる.wav" },
    { name: "バックバックバックバック", soundFile: "sounds/バックバックバックバック.wav" },
    { name: "噛ませ犬のいい匂いがぷんぷんする", soundFile: "sounds/噛ませ犬のいい匂いがぷんぷんする.wav" },
    { name: "なっさけな", soundFile: "sounds/なっさけな.wav" },
    { name: "オホホホホ", soundFile: "sounds/オホホホホ.wav" },
    { name: "投げるな！", soundFile: "sounds/投げるな！.wav" },
    { name: "てめえのせいだ！", soundFile: "sounds/てめえのせいだ！.wav" },
    { name: "なにこれ！？", soundFile: "sounds/なにこれ！？.wav" },
    { name: "入籍×6", soundFile: "sounds/入籍×6.wav" },
    { name: "ぼんぼこ産もう！", soundFile: "sounds/ぼんぼこ産もう！.wav" },
    { name: "あぶねえ", soundFile: "sounds/あぶねえ.wav" },
    { name: "牛田ペトラぺと", soundFile: "sounds/牛田ペトラぺと.wav" },
    { name: "こんぺと！こんぺと！こんぺと～！", soundFile: "sounds/こんぺと！こんぺと！こんぺと～！.wav" },
    { name: "あーまずい", soundFile: "sounds/あーまずい.wav" },
    { name: "これはセーフでしょ", soundFile: "sounds/これはセーフでしょ.wav" },
    { name: "死は救済なんかじゃないからな", soundFile: "sounds/死は救済なんかじゃないからな.wav" },
    { name: "逃げるな卑怯者！", soundFile: "sounds/逃げるな卑怯者！.wav" },
    { name: "撮れ高×3", soundFile: "sounds/撮れ高×3.wav" },
    { name: "撮れ高", soundFile: "sounds/撮れ高.wav" },
    { name: "いけええ！！", soundFile: "sounds/いけええ！！.wav" },
    { name: "くれええ！！", soundFile: "sounds/くれええ！！.wav" },
    { name: "やったー！！！", soundFile: "sounds/やったー！！！.wav" },
    { name: "ゲップしました", soundFile: "sounds/ゲップしました.wav" },
    { name: "サキュバスの", soundFile: "sounds/サキュバスの.wav" },
    { name: "酪農家", soundFile: "sounds/酪農家.wav" },
    { name: "オモロ", soundFile: "sounds/オモロ.wav" },
    { name: "んああああ(絶叫)", soundFile: "sounds/んああああ(絶叫).wav" },
    { name: "ペトラナイトメア", soundFile: "sounds/ペトラナイトメア.wav" },
    { name: "アリーナ！", soundFile: "sounds/アリーナ！.wav" },
    { name: "それでも！", soundFile: "sounds/それでも！.wav" },
    { name: "おつぺと～", soundFile: "sounds/おつぺと～.wav" },
    { name: "おぱんちゅおぱんちゅ～", soundFile: "sounds/おぱんちゅおぱんちゅ～.wav" },
    { name: "喋れる歌えるパンツも見れる", soundFile: "sounds/喋れる歌えるパンツも見れる.wav" },
    { name: "おぱんちゅｲﾃﾃﾞｷﾒｰｼｭ", soundFile: "sounds/おぱんちゅｲﾃﾃﾞｷﾒｰｼｭ.wav" },
    { name: "ズームイン！", soundFile: "sounds/ズームイン！.wav" },
    { name: "おつぺとー！", soundFile: "sounds/おつぺとー！.wav" },
    { name: "こんぺとー！", soundFile: "sounds/こんぺとー！.wav" },
    { name: "こんぺと～", soundFile: "sounds/こんぺと～.wav" },
    { name: "お酒を飲みましゅ", soundFile: "sounds/お酒を飲みましゅ.wav" },
    { name: "よろしくお願いします", soundFile: "sounds/よろしくお願いします.wav" },
    { name: "人間てほんとバカばっか", soundFile: "sounds/人間てほんとバカばっか.wav" }
];

// ボタンデータを名前順にソート
buttonsData.sort((a, b) => a.name.localeCompare(b.name, 'ja'));

// ボタンリストと音声アイテム、プレイリストの要素を取得
const buttonList = document.getElementById('buttonList');
const audioItems = document.getElementById('audioItems');
const playlistItems = document.getElementById('playlistItems');

// ボタンデータを基にボタンを生成し、ボタンリストに追加
buttonsData.forEach(button => {
    const btn = document.createElement('button');
    btn.classList.add('playButton');
    btn.textContent = button.name;
    btn.dataset.sound = button.soundFile;
    btn.addEventListener('click', () => playSound(btn, button.soundFile)); // ボタンをクリックした時の音声再生
    buttonList.appendChild(btn);

    // 音声アイテムをリストに追加
    const listItem = document.createElement('div');
    listItem.classList.add('audio-item');
    listItem.textContent = button.name;
    listItem.addEventListener('click', () => {
        const playlistItem = document.createElement('div');
        playlistItem.classList.add('playlist-item');
        playlistItem.dataset.sound = button.soundFile;

        // プレイリスト内のアイテムに移動・削除ボタンを追加
        const span = document.createElement('span');
        span.textContent = button.name;

        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('button-group');

        const upBtn = document.createElement('button');
        upBtn.textContent = '↑';
        upBtn.classList.add('move-btn');
        upBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // プレイリスト内のアイテムを上に移動
            if (playlistItem.previousElementSibling) {
                playlistItems.insertBefore(playlistItem, playlistItem.previousElementSibling);
            }
        });

        const downBtn = document.createElement('button');
        downBtn.textContent = '↓';
        downBtn.classList.add('move-btn');
        downBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // プレイリスト内のアイテムを下に移動
            if (playlistItem.nextElementSibling) {
                playlistItems.insertBefore(playlistItem.nextElementSibling, playlistItem);
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // アイテムを削除
            playlistItem.remove();
        });

        // ボタングループに各ボタンを追加
        buttonGroup.appendChild(upBtn);
        buttonGroup.appendChild(downBtn);
        buttonGroup.appendChild(deleteBtn);

        // プレイリストアイテムに名前とボタングループを追加
        playlistItem.appendChild(span);
        playlistItem.appendChild(buttonGroup);
        playlistItems.appendChild(playlistItem);
    });
    audioItems.appendChild(listItem);
});

// ランダム再生ボタンのイベントリスナー
document.getElementById("randomButton").addEventListener("click", () => {
    const randomSound = buttonsData[Math.floor(Math.random() * buttonsData.length)];

    // 仮のボタン要素を作成して渡す（null でもOKにしたい場合は playSound 側も対応が必要）
    playSound(null, randomSound.soundFile);
});

// 音量変更時の処理
document.getElementById("volumeControl").addEventListener("input", (event) => {
    if (currentAudio) {
        currentAudio.volume = event.target.value; // 音量を変更
    }
});

const playSequenceBtn = document.getElementById("playSequenceBtn");

// プレイリスト再生ボタンのイベントリスナー
document.getElementById("playSequenceBtn").addEventListener("click", () => {
    const items = Array.from(playlistItems.children); // プレイリストアイテム取得
    const playStopButton = document.getElementById("playSequenceBtn");

    function playNext() {
        if (playlistIndex >= items.length) {
            stopPlayback(); // 全曲終了後に停止処理
            return;
        }

        const soundFile = items[playlistIndex].dataset.sound;
        playlistAudio = new Audio(soundFile);
        playlistAudio.volume = document.getElementById('volumeControl').value;
        playlistAudio.play();
        playlistIndex++;

        // 再生終了時に次の曲へ
        playlistAudio.addEventListener('ended', playNext);

        playStopButton.textContent = "停止";
        playSequenceBtn.style.backgroundColor = "#F44336";
        isPlaylistPlaying = true;
    }

    function stopPlayback() {
        if (playlistAudio) {
            playlistAudio.pause();
            playlistAudio.currentTime = 0;
        }
        playlistIndex = 0;
        playlistAudio = null;
        isPlaylistPlaying = false;
        playStopButton.textContent = "再生";
        playSequenceBtn.style.backgroundColor = "#4CAF50";
    }

    if (isPlaylistPlaying) {
        stopPlayback();
    } else {
        playNext();
    }
});

// プレイリスト削除ボタンのイベントリスナー
document.getElementById("clearPlaylistBtn").addEventListener("click", () => {
    playlistItems.innerHTML = ""; // プレイリストを全て削除
});
