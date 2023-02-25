"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var solid_1 = require("@heroicons/react/24/solid");
var firestore_1 = require("firebase/firestore");
var react_1 = require("next-auth/react");
var react_2 = require("react");
var firebase_1 = require("../firebase");
var react_hot_toast_1 = require("react-hot-toast");
var swr_1 = require("swr");
var ModelSelection_1 = require("./ModelSelection");
function ChatInput(_a) {
    var _this = this;
    var chatId = _a.chatId;
    var session = react_1.useSession().data;
    var _b = react_2.useState(''), prompt = _b[0], setPrompt = _b[1];
    var model = swr_1["default"]('model', {
        fallbackData: 'text-davinci-003'
    }).data;
    var sendMessage = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var input, message, notification;
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    e.preventDefault();
                    if (!prompt)
                        return [2 /*return*/];
                    input = prompt.trim();
                    setPrompt('');
                    message = {
                        text: input,
                        createdAt: firestore_1.serverTimestamp(),
                        user: {
                            _id: (_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.email,
                            name: (_b = session === null || session === void 0 ? void 0 : session.user) === null || _b === void 0 ? void 0 : _b.name,
                            avatar: ((_c = session === null || session === void 0 ? void 0 : session.user) === null || _c === void 0 ? void 0 : _c.image) || "https://ui-avatars.com/api/?name=" + ((_d = session === null || session === void 0 ? void 0 : session.user) === null || _d === void 0 ? void 0 : _d.name)
                        }
                    };
                    return [4 /*yield*/, firestore_1.addDoc(firestore_1.collection(firebase_1.db, 'users', (_e = session === null || session === void 0 ? void 0 : session.user) === null || _e === void 0 ? void 0 : _e.email, 'chats', chatId, 'messages'), message)
                        //Toaster notification for loading
                    ];
                case 1:
                    _f.sent();
                    notification = react_hot_toast_1.toast.loading('ChatGPT is thinking!!!');
                    return [4 /*yield*/, fetch('/api/askQuestion', {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                prompt: input,
                                chatId: chatId, model: model, session: session
                            })
                        }).then(function () {
                            //Toast notification to say successful
                            react_hot_toast_1.toast.success('ChatGPT has responded!', {
                                id: notification
                            });
                        })];
                case 2:
                    _f.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "bg-gray-700 text-gray-400 rounded-lg text-sm" },
        React.createElement("form", { className: "p-5 space-x-5 flex", onSubmit: sendMessage },
            React.createElement("input", { className: "focus:outline-none bg-transparent flex-1 disabled:cursor-not-allowed disabled:text-gray-300", value: prompt, type: 'text', placeholder: "Type your message here", onChange: function (e) { return setPrompt(e.target.value); }, disabled: !session }),
            React.createElement("button", { type: "submit", disabled: !prompt || !session, className: 'bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed' },
                React.createElement(solid_1.PaperAirplaneIcon, { className: "h-4 w-4 -rotate-45" }))),
        React.createElement("div", { className: "md:hidden" },
            React.createElement(ModelSelection_1["default"], null))));
}
exports["default"] = ChatInput;
