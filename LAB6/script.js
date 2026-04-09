function setCookie(name, value, days = 365) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + "=" + value + ";expires=" + expires + ";path=/";
}


function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].startsWith(name + "=")) {
            return cookies[i].split("=")[1];
        }
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";}




let likes    = parseInt(getCookie("likes")    || "0");
let dislikes = parseInt(getCookie("dislikes") || "0");
let voted    = getCookie("voted");  
let comments = [];


try {
    comments = JSON.parse(getCookie("comments") || "[]");
} catch(e) {
    comments = [];
}

function init() {

    document.getElementById("likeCount").textContent    = likes;
    document.getElementById("dislikeCount").textContent = dislikes;

    renderVotedState();

    renderComments();
}

init();





function vote(type) {

    if (voted === type) {
        if (type === "like") {
            likes--;
            setCookie("likes", likes);
        } else {
            dislikes--;
            setCookie("dislikes", dislikes);
        }
        voted = null;
        deleteCookie("voted");

    } else if (!voted) {
        if (type === "like") {
            likes++;
            setCookie("likes", likes);
        } else {
            dislikes++;
            setCookie("dislikes", dislikes);
        }
        voted = type;
        setCookie("voted", voted);

    } else {
        showAlert("ألغِ تصويتك أولاً!");
        return;
    }

    document.getElementById("likeCount").textContent    = likes;
    document.getElementById("dislikeCount").textContent = dislikes;
    renderVotedState();
}

function renderVotedState() {
    const likeBtn    = document.getElementById("likeBtn");
    const dislikeBtn = document.getElementById("dislikeBtn");
    const notice     = document.getElementById("votedNotice");

    likeBtn.classList.remove("liked", "disabled");
    dislikeBtn.classList.remove("disliked", "disabled");

    if (voted === "like") {
        likeBtn.classList.add("liked");     
        dislikeBtn.classList.add("disabled"); 
        notice.textContent = "اضغط مرة ثانية للإلغاء";
    } else if (voted === "dislike") {
        dislikeBtn.classList.add("disliked"); 
        likeBtn.classList.add("disabled");    
        notice.textContent = "اضغط مرة ثانية للإلغاء";
    } else {
        notice.textContent = ""; 
    }
}



function submitComment() {
    const input = document.getElementById("commentInput");
    const text  = input.value.trim(); // trim() يحذف المسافات الزائدة

    if (!text) {
        showAlert("اكتب تعليقاً أولاً!");
        return;
    }

    if (getCookie("commented")) {
        showAlert("علّقت بالفعل!");
        return;
    }

    // أضف التعليق للمصفوفة واحفظها
    comments.push(text);
    setCookie("comments",  JSON.stringify(comments));
    setCookie("commented", "1");

    input.value = ""; // نظّف الحقل
    renderComments();
}

function clearInput() {
    document.getElementById("commentInput").value = "";
}

function renderComments() {
    const list = document.getElementById("commentsList");
    list.innerHTML = ""; // امسح القائمة القديمة

    comments.forEach(function(comment) {
        const div = document.createElement("div");  // أنشئ div جديد
        div.className   = "comment-item";
        div.textContent = comment;
        list.appendChild(div); // أضفه للصفحة
    });
}



function resetAll() {
    if (!confirm("هل تريد مسح كل شيء؟")) return;

    // حذف كل الـ cookies
    deleteCookie("likes");
    deleteCookie("dislikes");
    deleteCookie("voted");
    deleteCookie("comments");
    deleteCookie("commented");

    // إعادة المتغيرات للصفر
    likes = 0; dislikes = 0; voted = null; comments = [];

    // تحديث الشاشة
    document.getElementById("likeCount").textContent    = 0;
    document.getElementById("dislikeCount").textContent = 0;
    renderVotedState();
    renderComments();
}

// ── Toast ──
let alertTimer;
function showAlert(msg) {
    const el = document.getElementById("alert");
    el.textContent = msg;
    el.classList.add("show");

    clearTimeout(alertTimer);
    alertTimer = setTimeout(function() {
        el.classList.remove("show");
    }, 2500); // يختفي بعد 2.5 ثانية
}
