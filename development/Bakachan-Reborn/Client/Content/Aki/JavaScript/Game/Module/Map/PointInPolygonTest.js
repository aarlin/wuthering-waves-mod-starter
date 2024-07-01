"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PointInPolygonTest = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils");
class PointInPolygonTest {
	constructor() {
		(this.$Di =
			"/Game/Aki/Data/PathLine/Pathline_EdgeWall/BP_BasePathLine_Edgewall.BP_BasePathLine_Edgewall_C"),
			(this.IsSplineInit = !1),
			(this.YDi = new BinSet()),
			(this.JDi = new Array()),
			(this.zDi = Vector2D_1.Vector2D.Create());
	}
	InitSpline() {
		var t = this.$Di;
		this.IsSplineInit ||
			ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, (t) => {
				this.zwe(t), (this.IsSplineInit = !0), this.Zwe(this.JDi, 30, this.YDi);
			});
	}
	zwe(t) {
		let e;
		(t = ActorSystem_1.ActorSystem.Get(
			t,
			MathUtils_1.MathUtils.DefaultTransform,
		)).IsA(UE.BP_BasePathLine_Edgewall_C.StaticClass()) &&
			((n = (e = t).OriginalLocation),
			t.K2_SetActorLocationAndRotation(
				n,
				Rotator_1.Rotator.ZeroRotator,
				!1,
				void 0,
				!1,
			));
		var i = e.Spline,
			n = i.GetNumberOfSplinePoints();
		this.JDi.slice(0, n);
		for (let t = 0, e = n; t < e; t++) {
			var s = i.GetWorldLocationAtSplinePoint(t);
			this.JDi.push(new Vector2D_1.Vector2D(s.X, s.Y));
		}
		t.K2_DestroyActor();
	}
	eBe(t, e, i, n, s) {
		let r = i,
			o = n;
		n < i && ((r = n), (o = i)),
			s.Bins[t].MinX > r && (s.Bins[t].MinX = r),
			s.Bins[t].MaxX < o && (s.Bins[t].MaxX = o),
			(s.Bins[t].EdgeSet[e].MinX = r),
			(s.Bins[t].EdgeSet[e].MaxX = o);
	}
	BinTest(t) {
		if (!this.IsSplineInit) return !0;
		this.zDi.Set(t.X, t.Y);
		var e = this.zDi,
			i = ((t = this.YDi), this.JDi);
		if (e.Y < t.MinY || e.Y >= t.MaxY || e.X < t.MinX || e.X >= t.MaxX)
			return !1;
		var n = Math.floor((e.Y - t.MinY) * t.InvDeltaY);
		t = t.Bins[n];
		if (e.X < t.MinX || e.X > t.MaxX) return !1;
		var s,
			r,
			o,
			a = t.EdgeSet,
			l = t.Count;
		let Y = 0,
			M = !1;
		for (let t = 0; t < l; t++, Y++) {
			if (e.X < a[Y].MinX) {
				do {
					(!a[Y].FullCross &&
						((s = a[Y].Id), e.Y <= i[s].Y == e.Y <= i[(s + 1) % i.length].Y)) ||
						(M = !M),
						(Y += 1);
				} while (++t < l);
				return M;
			}
			e.X < a[Y].MaxX &&
				((r = i[(o = a[Y].Id)]),
				(o = i[(o + 1) % i.length]),
				a[Y].FullCross || e.Y <= r.Y != e.Y <= o.Y) &&
				r.X - ((r.Y - e.Y) * (o.X - r.X)) / (o.Y - r.Y) >= e.X &&
				(M = !M);
		}
		return M;
	}
	Zwe(t, e, i) {
		var n = new Array(e);
		(i.BinNum = e),
			(i.Bins = new Array(e)),
			(i.MinX = i.MaxX = t[0].X),
			(i.MinY = i.MaxY = t[0].Y);
		for (let e = 1; e < t.length; e++) {
			var s = t[e];
			i.MinX > s.X ? (i.MinX = s.X) : i.MaxX < s.X && (i.MaxX = s.X),
				i.MinY > s.Y ? (i.MinY = s.Y) : i.MaxY < s.Y && (i.MaxY = s.Y);
		}
		(i.MinY -= MathUtils_1.MathUtils.SmallNumber * (i.MaxY - i.MinY)),
			(i.MaxY += MathUtils_1.MathUtils.SmallNumber * (i.MaxY - i.MinY)),
			(i.DeltaY = (i.MaxY - i.MinY) / e),
			(i.InvDeltaY = 1 / i.DeltaY);
		let r,
			o,
			a,
			l = t[t.length - 1];
		for (let e = 0; e < t.length; e++) {
			if (((r = t[e]), l.Y !== r.Y)) {
				a = l.Y < r.Y ? ((o = r), l) : ((o = l), r);
				var Y = Math.floor((a.Y - i.MinY) * i.InvDeltaY),
					M = (o.Y - i.MinY) * i.InvDeltaY;
				let t = Math.floor(M);
				M - t == 0 && (t -= 1);
				for (let e = Y; e <= t; e++) n[e] = (n[e] ?? 0) + 1;
			}
			l = r;
		}
		for (let t = 0; t < e; t++) {
			i.Bins[t] = new Bin();
			var h = new Array(n[t]);
			for (let e = 0; e < n[t]; e++) h[e] = new Edge();
			(i.Bins[t].EdgeSet = h),
				(i.Bins[t].MinX = i.MaxX),
				(i.Bins[t].MaxX = i.MinX),
				(i.Bins[t].Count = 0);
		}
		l = t[t.length - 1];
		let X = t.length - 1;
		for (let e = 0; e < t.length; e++) {
			if (((r = t[e]), l.Y !== r.Y)) {
				var u =
						((a = l.Y < r.Y ? ((o = r), l) : ((o = l), r)).Y - i.MinY) *
						i.InvDeltaY,
					c = Math.floor(u),
					B = (o.Y - i.MinY) * i.InvDeltaY;
				let t = Math.floor(B),
					e = (B - t == 0 && (t -= 1), a.X);
				var D = (i.DeltaY * (o.X - a.X)) / (o.Y - a.Y);
				let n = e,
					s = !1;
				for (let r = c; r < t; r++, e = n) {
					n = a.X + (r + 1 - u) * D;
					var S = i.Bins[r].Count;
					i.Bins[r].Count++,
						(i.Bins[r].EdgeSet[S].Id = X),
						(i.Bins[r].EdgeSet[S].FullCross = s),
						this.eBe(r, S, e, n, i),
						(s = !0);
				}
				(e = n),
					(n = o.X),
					(B = i.Bins[t].Count++),
					(i.Bins[t].EdgeSet[B].Id = X),
					(i.Bins[t].EdgeSet[B].FullCross = !1),
					this.eBe(t, B, e, n, i);
			}
			(l = r), (X = e);
		}
		for (let t = 0; t < i.BinNum; t++)
			i.Bins[t].EdgeSet.sort((t, e) =>
				t.MinX === e.MinX ? 0 : t.MinX < e.MinX ? -1 : 1,
			);
	}
}
exports.PointInPolygonTest = PointInPolygonTest;
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
			(this.InvDeltaY = 0),
			(this.Bins = void 0),
			(this.MinY = 0);
	}
}
