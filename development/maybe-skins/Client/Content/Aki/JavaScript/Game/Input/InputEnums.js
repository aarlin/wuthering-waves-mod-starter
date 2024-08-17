"use strict";
var EInputAction, EInputAxis;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EInputAxis = exports.EInputAction = void 0),
	(function (o) {
		(o[(o.None = 0)] = "None"),
			(o[(o["跳跃"] = 1)] = "跳跃"),
			(o[(o["攀爬"] = 2)] = "攀爬"),
			(o[(o["走跑切换"] = 3)] = "走跑切换"),
			(o[(o["攻击"] = 4)] = "攻击"),
			(o[(o["闪避"] = 5)] = "闪避"),
			(o[(o["技能1"] = 6)] = "技能1"),
			(o[(o["幻象1"] = 7)] = "幻象1"),
			(o[(o["大招"] = 8)] = "大招"),
			(o[(o["幻象2"] = 9)] = "幻象2"),
			(o[(o["切换角色1"] = 10)] = "切换角色1"),
			(o[(o["切换角色2"] = 11)] = "切换角色2"),
			(o[(o["切换角色3"] = 12)] = "切换角色3"),
			(o[(o["锁定目标"] = 13)] = "锁定目标"),
			(o[(o["瞄准"] = 14)] = "瞄准"),
			(o[(o["通用交互"] = 15)] = "通用交互");
	})((EInputAction = exports.EInputAction || (exports.EInputAction = {}))),
	(function (o) {
		(o[(o.None = 0)] = "None"),
			(o[(o.LookUp = 1)] = "LookUp"),
			(o[(o.Turn = 2)] = "Turn"),
			(o[(o.MoveForward = 3)] = "MoveForward"),
			(o[(o.MoveRight = 4)] = "MoveRight"),
			(o[(o.Zoom = 5)] = "Zoom"),
			(o[(o.WheelAxis = 6)] = "WheelAxis");
	})((EInputAxis = exports.EInputAxis || (exports.EInputAxis = {})));
