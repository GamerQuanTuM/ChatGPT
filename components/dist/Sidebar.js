"use client";
"use strict";
exports.__esModule = true;
var firestore_1 = require("firebase/firestore");
var react_1 = require("next-auth/react");
var firestore_2 = require("react-firebase-hooks/firestore");
var firebase_1 = require("../firebase");
var ChatRow_1 = require("./ChatRow");
var ModelSelection_1 = require("./ModelSelection");
var NewChat_1 = require("./NewChat");
function Sidebar() {
    var _a, _b;
    var session = react_1.useSession().data;
    var _c = firestore_2.useCollection(session && firestore_1.query(firestore_1.collection(firebase_1.db, 'users', (_a = session.user) === null || _a === void 0 ? void 0 : _a.email, 'chats'), firestore_1.orderBy('createdAt', 'asc'))), chats = _c[0], loading = _c[1], error = _c[2];
    return (React.createElement("div", { className: 'p-2 flex flex-col h-screen' },
        React.createElement("div", { className: 'flex-1' },
            React.createElement("div", { className: 'space-y-2' },
                React.createElement(NewChat_1["default"], null),
                React.createElement("div", { className: 'hidden sm:inline' },
                    React.createElement(ModelSelection_1["default"], null)),
                React.createElement("div", { className: 'flex flex-col space-y-2 my-2' },
                    loading && (React.createElement("div", { className: 'animate-pulse text-center text-white' },
                        React.createElement("p", null, "Loading Chats...."))), chats === null || chats === void 0 ? void 0 :
                    chats.docs.map(function (chat) { return (React.createElement(ChatRow_1["default"], { key: chat.id, id: chat.id })); })))),
        session && (React.createElement("img", { onClick: function () { return react_1.signOut(); }, className: 'rounded-full w-12 h-12 cursor-pointer mx-auto mb-2 hover:opacity-50', src: (_b = session.user) === null || _b === void 0 ? void 0 : _b.image, alt: "profile-pic" }))));
}
exports["default"] = Sidebar;
