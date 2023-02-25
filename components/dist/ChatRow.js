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
var outline_1 = require("@heroicons/react/24/outline");
var firestore_1 = require("firebase/firestore");
var react_1 = require("next-auth/react");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var react_2 = require("react");
var firestore_2 = require("react-firebase-hooks/firestore");
var firebase_1 = require("../firebase");
function ChatRow(_a) {
    var _this = this;
    var _b, _c;
    var id = _a.id;
    var pathname = navigation_1.usePathname();
    var router = navigation_1.useRouter();
    var session = react_1.useSession().data;
    var _d = react_2.useState(false), active = _d[0], setActive = _d[1];
    var messages = firestore_2.useCollection(firestore_1.collection(firebase_1.db, 'users', (_b = session === null || session === void 0 ? void 0 : session.user) === null || _b === void 0 ? void 0 : _b.email, 'chats', id, 'messages'))[0];
    react_2.useEffect(function () {
        if (!pathname)
            return;
        setActive(pathname.includes(id));
    }, [pathname]);
    var deleteChat = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, firestore_1.deleteDoc(firestore_1.doc(firebase_1.db, "users", (_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.email, "chats", id))];
                case 1:
                    _b.sent();
                    router.replace('/');
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(link_1["default"], { href: "/chat/" + id, className: "chatRow justify-center " + (active && 'bg-gray-700') },
        React.createElement(outline_1.ChatBubbleLeftIcon, { className: 'h-5 w-5' }),
        React.createElement("p", { className: 'flex-1 hidden md:inline-flex truncate' }, ((_c = messages === null || messages === void 0 ? void 0 : messages.docs[(messages === null || messages === void 0 ? void 0 : messages.docs.length) - 1]) === null || _c === void 0 ? void 0 : _c.data().text.slice(0, 15)) || "New Chat"),
        React.createElement(outline_1.TrashIcon, { onClick: deleteChat, className: 'h-5 w-5 text-gray-700 hover:text-red-700' })));
}
exports["default"] = ChatRow;
