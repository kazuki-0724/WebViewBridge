// WebView（ネイティブ）へメッセージ送信
document.getElementById('sendBtn1').onclick = function() {
  const message = { type: 'greeting', text: 'こんにちは、WebView!' };
  sendParamToNativeApp(message);
};

// WebView（ネイティブ）へメッセージ送信
document.getElementById('sendBtn2').onclick = function() {
  const message = { type: 'modal', text: 'fugafuga' };
  sendParamToNativeApp(message);
};

// WebView（ネイティブ）から呼ばれる関数
window.onNativeMessage = function(msg) {
  let log = document.getElementById('log');
  log.textContent = 'WebViewからのメッセージ: ' + msg;
};


function sendParamToNativeApp(param){
  // Androidの場合
  if (window.AndroidBridge && window.AndroidBridge.postMessage) {
    window.AndroidBridge.postMessage(JSON.stringify(param));
  }
  // iOSの場合
  else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.bridge) {
    window.webkit.messageHandlers.bridge.postMessage(param);
  }
  // デバッグ用
  else {
    alert('WebViewブリッジが見つかりません');
  }
}

function changeLogWithMsg(msg) {
  let log = document.getElementById('log');
  log.textContent = msg;
}

function changeLog() {
  let log = document.getElementById('log');
  log.textContent = "Logを変更しました";
}