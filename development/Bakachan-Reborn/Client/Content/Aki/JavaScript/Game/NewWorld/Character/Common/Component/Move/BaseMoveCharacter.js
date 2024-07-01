"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BaseMoveCharacter = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../../../Core/Net/Net"),
	MathCommon_1 = require("../../../../../../Core/Utils/Math/MathCommon"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	IComponent_1 = require("../../../../../../UniverseEditor/Interface/IComponent"),
	AiContollerLibrary_1 = require("../../../../../AI/Controller/AiContollerLibrary"),
	GlobalData_1 = require("../../../../../GlobalData"),
	ColorUtils_1 = require("../../../../../Utils/ColorUtils"),
	WorldFunctionLibrary_1 = require("../../../../../World/Bridge/WorldFunctionLibrary"),
	CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
	MoveToLocationLogic_1 = require("./MoveToLocationLogic"),
	PatrolMoveLogic_1 = require("./PatrolMoveLogic"),
	PatrolMovePointsLogic_1 = require("./PatrolMovePointsLogic"),
	DEFAULT_TURN_SPEED = 360,
	END_DISTANCE = 30,
	NAV_DISTANCE = 200,
	NO_RESET_ANGLE = 20,
	NO_RESET_DISTANCE = 50,
	PER_TICK_MIN_MOVE_SPEED = 30;
class BaseMoveCharacter {
	constructor() {
		(this.wDe = 0),
			(this.Jh = void 0),
			(this.Hte = void 0),
			(this.aYo = void 0),
			(this.hYo = 0),
			(this.lYo = !1),
			(this._Yo = !1),
			(this.uYo = !1),
			(this.cYo = 0),
			(this.mYo = !1),
			(this.dYo = Vector_1.Vector.Create()),
			(this.CYo = !1),
			(this.gYo = 0),
			(this.fYo = 0),
			(this.pYo = 0),
			(this.jye = Vector_1.Vector.Create()),
			(this.RTe = Vector_1.Vector.Create()),
			(this.vYo = Vector_1.Vector.Create()),
			(this.MYo = void 0),
			(this.rWo = void 0),
			(this.hse = void 0),
			(this.mie = 0),
			(this.SYo = !1),
			(this.Ioo = !1),
			(this.EYo = void 0),
			(this.yYo = new PatrolMovePointsLogic_1.PatrolMovePointsLogic()),
			(this.IYo = new PatrolMoveLogic_1.PatrolMoveLogic()),
			(this.TYo = (t) => {
				this.EYo && this.EYo(t);
			}),
			(this.PushMoveInfo = () => {
				var t = Protocol_1.Aki.Protocol.Zhs.create(),
					o = Protocol_1.Aki.Protocol.o2s.create();
				(o.rkn = MathUtils_1.MathUtils.NumberToLong(
					this.Hte.CreatureData.GetCreatureDataId(),
				)),
					(o.$kn = this.Hte.ActorLocationProxy),
					(o.D3n = void 0),
					(t.m4n = [o]),
					Net_1.Net.Send(24100, t),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"AI",
							43,
							"向服务器同步NPC位置",
							["EntityId", this.Jh.Id],
							["PbDataId", this.wDe],
							["X", o.$kn.X],
							["Y", o.$kn.Y],
							["Z", o.$kn.Z],
						);
			});
	}
	get CurrentToLocation() {
		return this.yYo.TargetPoint.Position;
	}
	Init(t) {
		(this.Jh = t),
			(this.Hte = this.Jh.GetComponent(3)),
			(this.aYo = this.Jh.GetComponent(89)),
			(this.wDe = this.Hte.CreatureData.GetPbDataId()),
			(this.MYo = []),
			(this.Ioo = !1),
			this.yYo.Init(this.Hte),
			this.IYo.Init(this.Jh);
	}
	UpdateMove(t) {
		if (this.IsRunning)
			if (this.yYo.TargetPoint) {
				(this.mie += t),
					1 < this.mie && ((this.mie = 0), this.LYo()),
					GlobalData_1.GlobalData.IsPlayInEditor &&
						MoveToLocationLogic_1.MoveToLocationController.DebugDraw &&
						this.DYo();
				let o = !1,
					e = !1,
					i = this.IYo.UpdateMove(t, this.SYo);
				for (; !i; ) {
					if (
						((e = e || 0 <= this.yYo.TargetPoint.Index),
						this.RYo(),
						this.yYo.CheckMoveLastPoint())
					) {
						return (
							this.IYo.ResetLastPointCondition() &&
								this.IYo.ResetLastPatrolPoint(t, !1),
							this.PYo(),
							void this.MoveEnd(1)
						);
					}
					(o = !0), this.UYo(), (i = this.IYo.UpdateMove(t, this.SYo));
				}
				!this.lYo &&
					this.IYo.ResetLastPointCondition() &&
					this.AYo() &&
					this.IYo.ResetLastPatrolPoint(t, !0),
					o && e && this.PYo(),
					this.CYo &&
						t > MathCommon_1.MathCommon.KindaSmallNumber &&
						this.xYo(t, o);
			} else this.MoveEnd(2);
	}
	xYo(t, o) {
		var e = Vector_1.Vector.Dist(
			this.Hte.ActorLocationProxy,
			this.CurrentToLocation,
		);
		if (Math.abs(this.pYo - e) / t > 30 || 0 === this.pYo || o)
			this.fYo = this.gYo;
		else if (((this.fYo -= t), this.fYo <= 0))
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"AI",
						43,
						"检测到移动行为不符合预期,持续卡住超时,返回移动失败",
						["EntityId", this.Jh.Id],
						["PbDataId", this.wDe],
						["超时时限", this.gYo],
					),
				void this.MoveEnd(2)
			);
		this.pYo = e;
	}
	UYo() {
		this.mYo && (this.mYo = !1),
			this.yYo.ChangeToNextPoint(),
			this.wYo(
				this.yYo.GetPreviousLocation(),
				this.yYo.TargetPoint.Position,
				this._Yo,
				!1,
			);
	}
	AYo() {
		if (!(o = this.yYo.GetPreviousLocation())) return !1;
		this.jye.DeepCopy(this.Hte.ActorLocationProxy),
			this.jye.SubtractionEqual(o),
			this.lYo || (this.jye.Z = 0);
		var t = this.jye.Size(),
			o =
				(this.RTe.DeepCopy(this.CurrentToLocation),
				this.RTe.SubtractionEqual(o),
				this.lYo || (this.RTe.Z = 0),
				this.RTe.Size());
		return (
			0 !== t &&
			0 !== o &&
			((t = this.jye.DotProduct(this.RTe) / (t * o)),
			(t = MathCommon_1.MathCommon.RadToDeg * Math.acos(t)),
			this.jye.CrossProduct(this.RTe, this.jye),
			(o = this.jye.Size() / o),
			!(0 < t && t < 20 && o < 50))
		);
	}
	StopMove() {
		var t;
		this.IsRunning &&
			(this.Hte.ClearInput(),
			(t = this.yYo.UpdatePreIndex()),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"AI",
					43,
					"中断巡逻",
					["EntityId", this.Jh.Id],
					["PbDataId", this.wDe],
					["Index", this.yYo.TargetIndex],
					["PreIndex", t],
					["CurrentLoc", this.Hte.ActorLocationProxy],
				),
			this.BYo());
	}
	Dispose() {
		this.BYo();
	}
	BYo() {
		this.IYo.StopMove(),
			(this.MYo = []),
			(this.Ioo = !1),
			(this.mYo = !0),
			this.dYo.DeepCopy(this.Hte.ActorLocationProxy);
	}
	MoveAlongPath(t) {
		var o;
		this.Hte
			? ((this.Ioo = !0),
				(o = t.TurnSpeed ?? 360),
				(this.cYo = o),
				(this.lYo = t.IsFly),
				(this._Yo = t.Navigation && !t.IsFly),
				(this.hYo = t.Distance ?? 30),
				(this.SYo = t.DebugMode),
				(this.EYo = t.Callback),
				(this.uYo = t.ReturnFalseWhenNavigationFailed),
				t.ReturnTimeoutFailed && 0 !== t.ReturnTimeoutFailed
					? ((this.CYo = !0),
						(this.gYo = t.ReturnTimeoutFailed),
						(this.fYo = t.ReturnTimeoutFailed))
					: (this.CYo = !1),
				this.yYo.UpdateMovePoints(t),
				this.LYo(),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"AI",
						43,
						"开始巡逻",
						["EntityId", this.Jh.Id],
						["PbDataId", this.wDe],
						["循环巡逻", t.Loop],
						["环形巡逻", t.CircleMove ?? !1],
						["飞行模式", this.lYo],
						["寻路", this._Yo],
						["容差", this.hYo],
					),
				(o = Vector_1.Vector.Dist2D(this.dYo, this.Hte.ActorLocationProxy)),
				t.UsePreviousIndex && this.mYo && o > this.hYo
					? (this.wYo(
							this.dYo,
							this.yYo.TargetPoint.Position,
							o > 200 || this._Yo,
							!0,
						),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"AI",
								43,
								"恢复中断巡逻",
								["EntityId", this.Jh.Id],
								["PbDataId", this.wDe],
								["当前目标点Index", this.yYo.TargetIndex],
							))
					: ((this.mYo = !1),
						this.wYo(void 0, this.yYo.TargetPoint.Position, this._Yo, !0)))
			: ((t = this.Jh?.GetComponent(0)),
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"AI",
						51,
						"[BaseMoveCharacter.MoveAlongPath]获取ActorComp失败",
						["PbDataId", t?.GetPbDataId()],
					));
	}
	MoveEnd(t) {
		this.StopMove(),
			this.yYo.Reset(),
			this.TYo(t),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"AI",
					43,
					"结束巡逻",
					["EntityId", this.Jh.Id],
					["PbDataId", this.wDe],
					["EndState", t],
				);
	}
	wYo(t, o, e, i) {
		if (
			((this.rWo = []),
			(!i && t) ||
				(this.vYo.DeepCopy(this.Hte.ActorLocationProxy),
				this.lYo || (this.vYo.Z -= this.Hte.HalfHeight),
				this.rWo.push(this.vYo)),
			t && this.rWo.push(t),
			this.rWo.push(o),
			e)
		) {
			(this.hse = []), this.hse.push(this.rWo[0]);
			for (let t = 0; t < this.rWo.length - 1; t++)
				if (
					((this.MYo = []),
					Vector_1.Vector.Dist2D(this.rWo[t], this.rWo[t + 1]) < this.hYo)
				)
					this.hse.push(this.rWo[t + 1]);
				else if (this.bYo(this.rWo[t], this.rWo[t + 1], this.MYo))
					for (let t = 1; t < this.MYo.length; t++) this.hse.push(this.MYo[t]);
				else {
					if (this.uYo) return void this.MoveEnd(2);
					this.hse.push(this.rWo[t + 1]);
				}
			this.IYo.UpdateMovePath(this.hse, this.lYo, this.cYo, this.hYo);
		} else this.IYo.UpdateMovePath(this.rWo, this.lYo, this.cYo, this.hYo);
	}
	bYo(t, o, e) {
		return (
			AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
				this.Hte.Owner.GetWorld(),
				t.ToUeVector(),
				o.ToUeVector(),
				e,
			) && 0 < e.length
		);
	}
	RYo() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"AI",
				43,
				"到达点",
				["EntityId", this.Jh.Id],
				["PbDataId", this.wDe],
				["TargetIndex", this.yYo.TargetIndex],
				["MovePoint.length", this.yYo.MovePoint.length],
				["飞行模式", this.lYo],
				["寻路", this._Yo],
			),
			this.LYo(),
			this.yYo.OnArriveMovePoint();
	}
	PYo() {
		var t = WorldFunctionLibrary_1.default.GetEntityTypeByEntity(
			this.Hte.Entity.Id,
		);
		t === Protocol_1.Aki.Protocol.HBs.Proto_Npc && this.qYo(),
			t === Protocol_1.Aki.Protocol.HBs.Proto_Monster && this.GYo();
	}
	GYo() {
		var t = this.Hte.Entity.GetComponent(57),
			o = t.GetCurrentMoveSample(),
			e =
				((o.$kn = this.Hte.ActorLocationProxy),
				t.PendingMoveInfos.push(o),
				Protocol_1.Aki.Protocol.Xhs.create());
		e.Mys.push(t.CollectPendingMoveInfos()),
			Net_1.Net.Send(29494, e),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"AI",
					43,
					"向服务器同步怪物位置",
					["EntityId", this.Jh.Id],
					["PbDataId", this.wDe],
					["X", o.$kn.X],
					["Y", o.$kn.Y],
					["Z", o.$kn.Z],
				);
	}
	qYo() {
		var t = Protocol_1.Aki.Protocol.o2s.create(),
			o =
				((t.rkn = MathUtils_1.MathUtils.NumberToLong(
					this.Hte.CreatureData.GetCreatureDataId(),
				)),
				(t.$kn = this.Hte.ActorLocationProxy),
				(t.D3n = this.Hte.ActorRotationProxy),
				Protocol_1.Aki.Protocol.Zhs.create());
		(o.m4n = [t]),
			Net_1.Net.Send(24100, o),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"AI",
					43,
					"向服务器同步NPC位置",
					["EntityId", this.Jh.Id],
					["PbDataId", this.wDe],
					["X", t.$kn.X],
					["Y", t.$kn.Y],
					["Z", t.$kn.Z],
				);
	}
	LYo() {
		var t, o;
		this.yYo.TargetPoint &&
			(o = this.Jh.GetComponent(36)) &&
			((t = this.yYo.TargetPoint.MoveSpeed),
			this.lYo
				? (o.CharacterMovement.SetMovementMode(5), t && o.SetMaxSpeed(t))
				: (t && o.SetMaxSpeed(t),
					(o = this.NYo(this.yYo.TargetPoint.MoveState)),
					CharacterUnifiedStateTypes_1.legalMoveStates
						.get(this.aYo.PositionState)
						.has(o) && this.aYo.SetMoveState(o)));
	}
	NYo(t) {
		if (t && this.aYo?.Valid)
			switch (t) {
				case IComponent_1.EPatrolMoveState.Walk:
					return this.aYo.PositionState ===
						CharacterUnifiedStateTypes_1.ECharPositionState.Water
						? CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim
						: CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
				case IComponent_1.EPatrolMoveState.Run:
					return this.aYo.PositionState ===
						CharacterUnifiedStateTypes_1.ECharPositionState.Water
						? CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim
						: CharacterUnifiedStateTypes_1.ECharMoveState.Run;
			}
		return CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
	}
	DYo() {
		if (
			0 !== this.yYo.MovePoint.length &&
			GlobalData_1.GlobalData.IsPlayInEditor
		)
			for (let o = this.yYo.MovePoint.length - 1; -1 < o; o--) {
				var t = this.yYo.MovePoint[o].Position;
				UE.KismetSystemLibrary.DrawDebugSphere(
					GlobalData_1.GlobalData.World,
					t.ToUeVector(),
					30,
					10,
					o === this.yYo.TargetIndex
						? ColorUtils_1.ColorUtils.LinearYellow
						: ColorUtils_1.ColorUtils.LinearWhite,
				);
			}
	}
	get IsRunning() {
		return this.Ioo;
	}
}
exports.BaseMoveCharacter = BaseMoveCharacter;
