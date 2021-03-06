/* global chrome */
console.log(chrome.storage);
chrome.storage.local.get(['userId'], (res) => {
  console.log(res);
  let userId = res.userId;

  if (userId == null) {
    userId = 2;
  }

  var htmlCode = document.documentElement.outerHTML;
  var data = JSON.stringify({
    "page_html": htmlCode,
    "user_id": userId
  });

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onload = function(e) {
    if (this.status === 200) {
      if (!this.response.error) {
        if (this.response.response.skills.length > 0) {
          var alertMessage = this.response.response.user.full_name + ' knows about [' +
                            this.response.response.skills.join(', ') + ']. You should ask them about your doubt!';
          alert(alertMessage)
        }
      } else {
        console.log('Error in the request:', this.response)
      }
    }
  };

  xhr.open("POST", "http://35.187.102.14:8081/help");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("cache-control", "no-cache");

  xhr.send(data);
});
