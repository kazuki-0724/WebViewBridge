// WebView（ネイティブ）へメッセージ送信
document.getElementById('sendBtn').onclick = function() {
  const message = { type: 'greeting', text: 'こんにちは、WebView!' };
  // Androidの場合
  if (window.AndroidBridge && window.AndroidBridge.postMessage) {
    window.AndroidBridge.postMessage(JSON.stringify(message));
  }
  // iOSの場合
  else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.bridge) {
    window.webkit.messageHandlers.bridge.postMessage(message);
  }
  // デバッグ用
  else {
    alert('WebViewブリッジが見つかりません');
  }
};

// WebView（ネイティブ）から呼ばれる関数
window.onNativeMessage = function(msg) {
  let log = document.getElementById('log');
  log.textContent = 'WebViewからのメッセージ: ' + msg;
};