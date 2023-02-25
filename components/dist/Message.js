"use strict";
exports.__esModule = true;
function Message(_a) {
    var message = _a.message;
    var isChatGPT = message.user.name === "ChatGPT";
    return (React.createElement("div", { className: "py-5 text-white " + (isChatGPT && 'bg-[#434654]') },
        React.createElement("div", { className: "flex space-x-5 px-10 max-w-2xl mx-auto" },
            React.createElement("img", { src: message.user.avatar, alt: "", className: "h-8 w-8" }),
            React.createElement("p", { className: "pt-1 text-sm" }, message.text))));
}
exports["default"] = Message;
