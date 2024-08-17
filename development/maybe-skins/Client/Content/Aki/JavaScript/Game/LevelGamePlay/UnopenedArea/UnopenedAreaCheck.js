"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UnopenedAreaCheck = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	AreaByAreaId_1 = require("../../../Core/Define/ConfigQuery/AreaByAreaId"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	TEST_AREA_COUNT = 30,
	FAILURE_COUNT = 7;
class UnopenedAreaCheck {
	constructor() {
		(this.IsSplineInit = !1),
			(this.Xwe = 0),
			(this.$we = new Map()),
			(this.Ywe = new Map());
	}
	AreaInit(e) {
		for (const t of e) this.Jwe(t.wFn, t.ckn ?? !1);
		0 === e.length &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Map", 43, "初始化区域数量为零"),
			(this.Xwe = 0),
			(this.IsSplineInit = !0);
	}
	AreaStatesChange(e) {
		this.Jwe(e.uys.wFn, e.uys.ckn ?? !1),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Map",
					43,
					"AreaStatesChange更新区域边界状态",
					["AreaState.Proto_AreaId", e.uys.wFn],
					["AreaState.Proto_State", e.uys.ckn ?? !1],
				);
	}
	Jwe(e, t) {
		if (AreaByAreaId_1.configAreaByAreaId.GetConfigList(e)[0].EdgeWallName) {
			const i =
				AreaByAreaId_1.configAreaByAreaId.GetConfigList(e)[0].EdgeWallName +
				"_C";
			if (
				(t ||
					(this.Ywe.get(i).has(e) &&
						(this.Ywe.get(i).delete(e), Log_1.Log.CheckInfo()) &&
						Log_1.Log.Info(
							"Map",
							43,
							"AreaPathMap区域删除",
							["AreaId", e],
							["Path", i],
						),
					0 === this.Ywe.get(i).size &&
						this.$we.has(i) &&
						(this.$we.delete(i), Log_1.Log.CheckInfo()) &&
						Log_1.Log.Info("Map", 43, "BinMap移除边界", ["Path", i])),
				t &&
					(this.Ywe.has(i) || this.Ywe.set(i, new Set()),
					this.Ywe.get(i).has(e) ||
						(this.Ywe.get(i).add(e),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Map",
								43,
								"AreaPathMap区域添加",
								["AreaId", e],
								["Path", i],
							)),
					!this.$we.has(i)))
			) {
				const e = new BinItem();
				(e.InitCallback = () => {
					e && e.BinSet && e.TestPoints
						? (this.$we.set(i, e),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Map", 43, "BinMap添加边界", ["Path", i]))
						: Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Map", 43, "BinMap添加边界出错", ["Path", i]);
				}),
					e.Init(i);
			}
		}
	}
	BinTest(e) {
		if (!this.IsSplineInit || 0 === this.$we.size)
			return (
				this.Xwe <= 7 &&
					(this.Xwe++,
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Map",
							43,
							"检测是否进入未开放区域，检测失败",
							["IsSplineInit", this.IsSplineInit],
							["BinMap.size", this.$we.size],
						),
					7 === this.Xwe) &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Map",
						43,
						"检测是否进入未开放区域一直失败，不报Log了",
					),
				!0
			);
		0 !== this.Xwe &&
			((this.Xwe = 0), Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info("Map", 43, "检测是否进入未开放区域，恢复正常检测");
		for (const t of this.$we) if (t[1].BinTest(e)) return !0;
		return !1;
	}
	Clear() {
		(this.IsSplineInit = !1), this.$we.clear();
	}
}
exports.UnopenedAreaCheck = UnopenedAreaCheck;
class BinItem {
	constructor() {
		(this.BinSet = new BinSet()),
			(this.TestPoints = new Array()),
			(this.InitCallback = void 0);
	}
	Init(e) {
		ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Class, (t) => {
			this.zwe(t)
				? (this.Zwe(this.TestPoints, 30, this.BinSet),
					this.InitCallback && this.InitCallback())
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Map",
						43,
						"样条Asset资源加载错误，或选中的目标样条非BP_BasePathLine_Edgewall类",
						["Path", e],
					);
		});
	}
	zwe(e) {
		let t;
		if (
			!(e = ActorSystem_1.ActorSystem.Get(
				e,
				MathUtils_1.MathUtils.DefaultTransform,
			)).IsA(UE.BP_BasePathLine_Edgewall_C.StaticClass())
		)
			return !1;
		var i = (t = e).OriginalLocation,
			o =
				(e.K2_SetActorLocationAndRotation(
					i,
					Rotator_1.Rotator.ZeroRotator,
					!1,
					void 0,
					!1,
				),
				t.Spline);
		i = o.GetNumberOfSplinePoints();
		this.TestPoints.slice(0, i);
		for (let e = 0, t = i; e < t; e++) {
			var n = o.GetWorldLocationAtSplinePoint(e);
			this.TestPoints.push(new Vector2D_1.Vector2D(n.X, n.Y));
		}
		return e.K2_DestroyActor(), !0;
	}
	eBe(e, t, i, o, n) {
		let s = i,
			a = o;
		o < i && ((s = o), (a = i)),
			n.Bins[e].MinX > s && (n.Bins[e].MinX = s),
			n.Bins[e].MaxX < a && (n.Bins[e].MaxX = a),
			(n.Bins[e].EdgeSet[t].MinX = s),
			(n.Bins[e].EdgeSet[t].MaxX = a);
	}
	BinTest(e) {
		var t = new Vector2D_1.Vector2D(e.X, e.Y),
			i = ((e = this.BinSet), this.TestPoints);
		if (t.Y < e.MinY || t.Y >= e.MaxY || t.X < e.MinX || t.X >= e.MaxX)
			return !1;
		var o = Math.floor((t.Y - e.MinY) * e.ReciprocalDeltaY);
		e = e.Bins[o];
		if (t.X < e.MinX || t.X > e.MaxX) return !1;
		var n,
			s,
			a,
			r = e.EdgeSet,
			h = e.Count;
		let l = 0,
			M = !1;
		for (let e = 0; e < h; e++, l++) {
			if (t.X < r[l].MinX) {
				do {
					(!r[l].FullCross &&
						((n = r[l].Id), t.Y <= i[n].Y == t.Y <= i[(n + 1) % i.length].Y)) ||
						(M = !M),
						(l += 1);
				} while (++e < h);
				return M;
			}
			t.X < r[l].MaxX &&
				((s = i[(a = r[l].Id)]),
				(a = i[(a + 1) % i.length]),
				r[l].FullCross || t.Y <= s.Y != t.Y <= a.Y) &&
				s.X - ((s.Y - t.Y) * (a.X - s.X)) / (a.Y - s.Y) >= t.X &&
				(M = !M);
		}
		return M;
	}
	Zwe(e, t, i) {
		var o = new Array(t);
		(i.BinNum = t),
			(i.Bins = new Array(t)),
			(i.MinX = i.MaxX = e[0].X),
			(i.MinY = i.MaxY = e[0].Y);
		for (let t = 1; t < e.length; t++) {
			var n = e[t];
			i.MinX > n.X ? (i.MinX = n.X) : i.MaxX < n.X && (i.MaxX = n.X),
				i.MinY > n.Y ? (i.MinY = n.Y) : i.MaxY < n.Y && (i.MaxY = n.Y);
		}
		(i.MinY -= MathUtils_1.MathUtils.SmallNumber * (i.MaxY - i.MinY)),
			(i.MaxY += MathUtils_1.MathUtils.SmallNumber * (i.MaxY - i.MinY)),
			(i.DeltaY = (i.MaxY - i.MinY) / t),
			(i.ReciprocalDeltaY = 1 / i.DeltaY);
		let s,
			a,
			r,
			h = e[e.length - 1];
		for (const t of e) {
			if (h.Y !== t.Y) {
				r = h.Y < t.Y ? ((a = t), h) : ((a = h), t);
				var l = Math.floor((r.Y - i.MinY) * i.ReciprocalDeltaY),
					M = (a.Y - i.MinY) * i.ReciprocalDeltaY;
				let e = Math.floor(M);
				M - e == 0 && (e -= 1);
				for (let t = l; t <= e; t++) o[t] = (o[t] ?? 0) + 1;
			}
			h = t;
		}
		for (let e = 0; e < t; e++) {
			i.Bins[e] = new Bin();
			var c = new Array(o[e]);
			for (let t = 0; t < o[e]; t++) c[t] = new Edge();
			(i.Bins[e].EdgeSet = c),
				(i.Bins[e].MinX = i.MaxX),
				(i.Bins[e].MaxX = i.MinX),
				(i.Bins[e].Count = 0);
		}
		h = e[e.length - 1];
		let g = e.length - 1;
		for (let t = 0; t < e.length; t++) {
			if (((s = e[t]), h.Y !== s.Y)) {
				var Y =
						((r = h.Y < s.Y ? ((a = s), h) : ((a = h), s)).Y - i.MinY) *
						i.ReciprocalDeltaY,
					X = Math.floor(Y),
					f = (a.Y - i.MinY) * i.ReciprocalDeltaY;
				let e = Math.floor(f),
					t = (f - e == 0 && (e -= 1), r.X);
				var I = (i.DeltaY * (a.X - r.X)) / (a.Y - r.Y);
				let o = t,
					n = !1;
				for (let s = X; s < e; s++, t = o) {
					o = r.X + (s + 1 - Y) * I;
					var L = i.Bins[s].Count;
					i.Bins[s].Count++,
						(i.Bins[s].EdgeSet[L].Id = g),
						(i.Bins[s].EdgeSet[L].FullCross = n),
						this.eBe(s, L, t, o, i),
						(n = !0);
				}
				(t = o),
					(o = a.X),
					(f = i.Bins[e].Count++),
					(i.Bins[e].EdgeSet[f].Id = g),
					(i.Bins[e].EdgeSet[f].FullCross = !1),
					this.eBe(e, f, t, o, i);
			}
			(h = s), (g = t);
		}
		for (let e = 0; e < i.BinNum; e++)
			i.Bins[e].EdgeSet.sort((e, t) =>
				e.MinX === t.MinX ? 0 : e.MinX < t.MinX ? -1 : 1,
			);
	}
}
class Edge {
	constructor() {
		(this.Id = 0), (this.FullCross = !1), (this.MinX = 0), (this.MaxX = 0);
	}
}
class Bin {
	constructor() {
		(this.EdgeSet = void 0), (this.MinX = 0), (this.MaxX = 0), (this.Count = 0);
	}
}
class BinSet {
	constructor() {
		(this.BinNum = 0),
			(this.MinX = 0),
			(this.MaxX = 0),
			(this.MaxY = 0),
			(this.DeltaY = 0),
			(this.ReciprocalDeltaY = 0),
			(this.Bins = void 0),
			(this.MinY = 0);
	}
}
