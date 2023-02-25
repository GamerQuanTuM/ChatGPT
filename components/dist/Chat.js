"use client";
"use strict";
exports.__esModule = true;
var outline_1 = require("@heroicons/react/24/outline");
var firestore_1 = require("firebase/firestore");
var react_1 = require("next-auth/react");
var firestore_2 = require("react-firebase-hooks/firestore");
var firebase_1 = require("../firebase");
var Message_1 = require("./Message");
function Chat(_a) {
    var _b;
    var chatId = _a.chatId;
    var session = react_1.useSession().data;
    var messages = firestore_2.useCollection(session && firestore_1.query(firestore_1.collection(firebase_1.db, "users", (_b = session.user) === null || _b === void 0 ? void 0 : _b.email, "chats", chatId, "messages"), firestore_1.orderBy("createdAt", "asc")))[0];
    return (React.createElement("div", { className: "flex-1 overflow-y-auto overflow-x-hidden" },
        (messages === null || messages === void 0 ? void 0 : messages.empty) && (React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mt-10 text-center text-white" }, "Type a prompt in below to get started!"),
            React.createElement(outline_1.ArrowDownCircleIcon, { className: "h-10 w-10 mx-auto mt-5 text-white animate-bounce" }))), messages === null || messages === void 0 ? void 0 :
        messages.docs.map(function (message) {
            return React.createElement(Message_1["default"], { key: message.id, message: message.data() });
        })));
}
exports["default"] = Chat;
