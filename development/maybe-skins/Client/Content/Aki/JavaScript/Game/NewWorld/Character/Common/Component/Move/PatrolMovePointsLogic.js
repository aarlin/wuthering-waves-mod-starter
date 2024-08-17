"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PatrolMovePointsLogic = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../../../Core/Net/Net"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	LevelGeneralContextDefine_1 = require("../../../../../LevelGamePlay/LevelGeneralContextDefine"),
	ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
	MAX_DISTANCE = 200;
class PatrolMovePointsLogic {
	constructor() {
		(this.Hte = void 0),
			(this.lJo = !1),
			(this._Jo = !1),
			(this.ooe = !1),
			(this.JYo = -1),
			(this.TargetIndex = 0),
			(this.TargetPoint = void 0),
			(this.MovePoint = []),
			(this.jye = Vector_1.Vector.Create()),
			(this.RTe = Vector_1.Vector.Create());
	}
	Init(t) {
		this.Hte = t;
	}
	Reset() {
		(this.TargetIndex = 0), (this.JYo = -1);
	}
	CheckMoveLastPoint() {
		return !this.lJo && this.TargetIndex === this.MovePoint.length - 1;
	}
	GetPreviousLocation() {
		return 0 <= this.JYo ? this.MovePoint[this.JYo].Position : void 0;
	}
	UpdateMovePoints(t) {
		let e = [],
			o = ((e = Array.isArray(t.Points) ? t.Points : [t.Points]), !0);
		this.uJo(this.MovePoint, e)
			? (o = !1)
			: (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"AI",
						43,
						"移动路径变更",
						["实体ID", this.Hte.CreatureData.GetPbDataId()],
						["PreviousIndex", this.JYo],
						["MovePathLength", this.MovePoint.length],
						["NewMovePathLength", e.length],
					),
				(this.JYo = -1),
				t.Loop &&
					!t.CircleMove &&
					void 0 !== t.StartWithInversePath &&
					(this.ooe = t.StartWithInversePath)),
			(this.MovePoint = e),
			(this.lJo = t.Loop),
			(this._Jo = t.CircleMove ?? !1),
			void 0 !== t.StartIndex &&
			0 <= t.StartIndex &&
			t.StartIndex < this.MovePoint.length
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"AI",
							51,
							"使用起始点移动",
							["实体ID", this.Hte.CreatureData.GetPbDataId()],
							["初始点Index", t.StartIndex],
							["TargetIndex", this.TargetIndex],
						),
					this.cJo(t.StartIndex))
				: t.UsePreviousIndex &&
						0 <= this.JYo &&
						this.JYo < this.MovePoint.length
					? (this.cJo(this.JYo),
						this.GetNextPoint() < this.MovePoint.length &&
							this.cJo(this.GetNextPoint()),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"AI",
								43,
								"使用上次的移动点",
								["实体ID", this.Hte.CreatureData.GetPbDataId()],
								["PreviousIndex", this.JYo],
								["TargetIndex", this.TargetIndex],
							))
					: t.UseNearestPoint && o
						? this.mJo()
						: this.cJo(0);
	}
	ChangeToNextPoint() {
		this.dJo(this.GetNextPoint());
	}
	GetNextPoint() {
		let t = 0;
		var e;
		return (
			this.lJo
				? this._Jo
					? (t = (this.TargetIndex + 1) % this.MovePoint.length)
					: this.ooe
						? 0 === this.TargetIndex
							? ((this.ooe = !1),
								(t = 0),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info("AI", 51, "往返式巡逻：回到起点", [
										"PbDataID",
										this.Hte.CreatureData.GetPbDataId(),
									]),
								((e = Protocol_1.Aki.Protocol.YYn.create()).rkn =
									MathUtils_1.MathUtils.NumberToLong(
										this.Hte.CreatureData.GetCreatureDataId(),
									)),
								(e.okn = !0),
								Net_1.Net.Call(10604, e, () => {}))
							: (t = this.TargetIndex - 1)
						: this.TargetIndex === this.MovePoint.length - 1
							? ((this.ooe = !0),
								(t = this.MovePoint.length - 2),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info("AI", 51, "往返式巡逻：走到终点", [
										"PbDataID",
										this.Hte.CreatureData.GetPbDataId(),
									]),
								((e = Protocol_1.Aki.Protocol.YYn.create()).rkn =
									MathUtils_1.MathUtils.NumberToLong(
										this.Hte.CreatureData.GetCreatureDataId(),
									)),
								(e.okn = !1),
								Net_1.Net.Call(10604, e, () => {}))
							: (t = this.TargetIndex + 1)
				: (t = this.TargetIndex + 1),
			t
		);
	}
	OnArriveMovePoint() {
		var t = this.TargetPoint;
		-1 !== t?.Index &&
			(t?.Actions &&
				0 < t.Actions.length &&
				ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
					t.Actions,
					LevelGeneralContextDefine_1.EntityContext.Create(this.Hte.Entity.Id),
				),
			t?.Callback && t.Callback(),
			t?.IsHide) &&
			this.CJo(t);
	}
	CJo(t) {
		this.Hte.SkeletalMesh?.SetVisibility(!t.IsHide);
		var e,
			o = this.Hte.Entity.GetComponent(185);
		o &&
			((e = -841499802),
			t.IsHide ? o.HasTag(e) || o.AddTag(e) : o.HasTag(e) && o.RemoveTag(e));
	}
	UpdatePreIndex() {
		return (
			this.JYo < 0 &&
				(this.ooe
					? (this.JYo = Math.min(this.MovePoint.length, this.TargetIndex + 1))
					: (this.JYo = Math.max(0, this.TargetIndex - 1))),
			this.JYo
		);
	}
	gJo(t, e) {
		return (
			t === e ||
			!(!t || !e || t.Index !== e.Index || !t.Position.Equals(e.Position))
		);
	}
	uJo(t, e) {
		if (t !== e) {
			if (!t || !e) return !1;
			if (t.length !== e.length) return !1;
			var o = t.length;
			for (let i = 0; i < o; ++i) if (!this.gJo(t[i], e[i])) return !1;
		}
		return !0;
	}
	dJo(t) {
		return (
			(this.JYo = this.TargetIndex),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"AI",
					43,
					"更新移动路径经过点下标",
					["实体ID", this.Hte.CreatureData.GetPbDataId()],
					["PreviousIndex", this.JYo],
					["MovePoint.length", this.MovePoint.length],
				),
			this.cJo(t)
		);
	}
	cJo(t) {
		return (
			(this.TargetIndex = t),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"AI",
					43,
					"更新移动路径目标点下标",
					["实体ID", this.Hte.CreatureData.GetPbDataId()],
					["TargetIndex", t],
					["MovePoint.length", this.MovePoint.length],
				),
			this.TargetIndex < this.MovePoint.length
				? ((this.TargetPoint = this.MovePoint[this.TargetIndex]), !0)
				: ((this.TargetPoint = void 0), !1)
		);
	}
	mJo() {
		var t = this.UTe();
		(this.TargetIndex = 0 <= t - 1 ? t - 1 : 0),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"AI",
					43,
					"使用最近的移动点",
					["实体ID", this.Hte.CreatureData.GetPbDataId()],
					["当前最近的点Index", t],
					["TargetIndex", this.TargetIndex],
				),
			this.cJo(t);
	}
	UTe() {
		let t = 0,
			e = Number.MAX_VALUE;
		var o = this.Hte.ActorLocationProxy;
		for (let r = 0, s = this.MovePoint.length; r < s; r++) {
			var i = this.MovePoint[r];
			0 <= i.Index &&
				(i = Vector_1.Vector.Dist(o, i.Position)) < e &&
				((e = i), (t = r));
		}
		if (
			0 === t ||
			(t === this.MovePoint.length - 1 &&
				e < 200 &&
				Vector_1.Vector.Dist(
					this.MovePoint[0].Position,
					this.MovePoint[this.MovePoint.length - 1].Position,
				) < 200)
		)
			return 0;
		for (let i = 0; i < this.MovePoint.length - 1; i++) {
			var r = this.MovePoint[i].Position,
				s = this.MovePoint[i + 1].Position,
				n =
					(this.jye.Set(s.X, s.Y, s.Z),
					this.jye.Subtraction(r, this.jye),
					this.jye.Size());
			this.RTe.Set(o.X, o.Y, o.Z),
				this.RTe.Subtraction(s, this.RTe),
				0 < this.jye.DotProduct(this.RTe) ||
					(this.RTe.Set(o.X, o.Y, o.Z),
					this.RTe.Subtraction(r, this.RTe),
					this.jye.DotProduct(this.RTe) < 0) ||
					(this.jye.CrossProduct(this.RTe, this.jye),
					(s = this.jye.Size() / n) < e &&
						((e = s), (t = this.ooe ? i : i + 1)));
		}
		return t;
	}
}
exports.PatrolMovePointsLogic = PatrolMovePointsLogic;
