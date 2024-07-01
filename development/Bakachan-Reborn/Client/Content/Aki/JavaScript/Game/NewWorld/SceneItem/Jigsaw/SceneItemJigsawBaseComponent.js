"use strict";
var SceneItemJigsawBaseComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, o, n) {
			var i,
				a = arguments.length,
				r =
					a < 3
						? e
						: null === n
							? (n = Object.getOwnPropertyDescriptor(e, o))
							: n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				r = Reflect.decorate(t, e, o, n);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(i = t[s]) &&
						(r = (a < 3 ? i(r) : 3 < a ? i(e, o, r) : i(e, o)) || r);
			return 3 < a && r && Object.defineProperty(e, o, r), r;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemJigsawBaseComponent = exports.JigsawIndex = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../../Core/Net/Net"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	CameraController_1 = require("../../../Camera/CameraController"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	COS_45 = Math.cos(0.25 * Math.PI),
	TIMER_PERIOD = 500;
class JigsawIndex {
	constructor(t, e) {
		(this.Row = 0),
			(this.Col = 0),
			(this.jSe = void 0),
			(this.urr = void 0),
			(this.crr = void 0),
			(this.Row = t),
			(this.Col = e);
	}
	GetKey() {
		return (
			(this.jSe && this.urr === this.Row && this.crr === this.Col) ||
				((this.jSe = this.Row.toString() + "," + this.Col.toString()),
				(this.urr = this.Row),
				(this.crr = this.Col)),
			this.jSe
		);
	}
	static GenObjFromKey(t) {
		return (t = t.split(",")), new JigsawIndex(Number(t[0]), Number(t[1]));
	}
	static GenKey(t, e) {
		return t.toString() + "," + e.toString();
	}
}
exports.JigsawIndex = JigsawIndex;
class JigsawState {
	constructor(t, e, o) {
		(this.State = 0),
			(this.Occupancy = !1),
			(this.ActivatedNum = 0),
			(this.State = t ?? 0),
			(this.Occupancy = e ?? !1),
			(this.ActivatedNum = o ?? 0);
	}
}
class BoxTraceCheckData {
	constructor(t, e, o) {
		(this.Location = Vector_1.Vector.Create()),
			(this.TagId = 0),
			(this.CurIndex = void 0),
			(this.Location = t),
			(this.TagId = e),
			(this.CurIndex = o);
	}
}
let SceneItemJigsawBaseComponent =
	(SceneItemJigsawBaseComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.Config = void 0),
				(this.SIe = void 0),
				(this.Hte = void 0),
				(this.Ncn = void 0),
				(this.Ocn = new Map()),
				(this.kcn = new Map()),
				(this.Fcn = new Map()),
				(this.Vcn = void 0),
				(this.Hcn = void 0),
				(this.jcn = 0),
				(this.ui = !1),
				(this.Wcn = new Set()),
				(this.Kcn = new Map()),
				(this.Qcn = void 0),
				(this.Xcn = (t, e, o) => {
					var n = e.Entity.GetComponent(0).GetPbDataId();
					this.Wcn.has(n) && this.$cn(e);
				}),
				(this.Ycn = () => {
					this.Jcn(), this.zcn();
				}),
				(this.Zcn = () => {
					for (var [t, e] of (!this.Kcn.size &&
						this.Qcn &&
						(TimerSystem_1.TimerSystem.Remove(this.Qcn), (this.Qcn = void 0)),
					this.Kcn)) {
						var o = t.GetComponent(139);
						if (o?.Valid)
							for (const t of e)
								o.StartBoxTrace(t.Location)
									? this.Ncn.HasTagByIndex(t.CurIndex, t.TagId) &&
										this.Ncn.RemoveTagsByIndex(t.CurIndex, t.TagId)
									: this.Ncn.HasTagByIndex(t.CurIndex, t.TagId) ||
										this.Ncn.AddTagsByIndex(t.CurIndex, t.TagId);
					}
				});
		}
		OnInitData(t) {
			(t = t.GetParam(SceneItemJigsawBaseComponent_1)[0]), (this.Config = t);
			for (const t of this.Config.JigsawConfig.Pieces) {
				var e = new JigsawIndex(t.Index.RowIndex, t.Index.ColumnIndex);
				switch (t.InitState) {
					case IAction_1.EJigsawPieceState.Disable:
						this.Ocn.set(e.GetKey(), new JigsawState());
						break;
					case IAction_1.EJigsawPieceState.Correct:
						this.Ocn.set(e.GetKey(), new JigsawState(1));
						break;
					case IAction_1.EJigsawPieceState.Incorrect:
						this.Ocn.set(e.GetKey(), new JigsawState(2));
				}
			}
			return !0;
		}
		OnStart() {
			return (
				(this.SIe = this.Entity.GetComponent(0)),
				(this.Hte = this.Entity.GetComponent(182)),
				(this.Ncn = this.Entity.GetComponent(143)),
				!0
			);
		}
		OnActivate() {
			if ((this.emn(), 0 < this.SIe.OccupiedGridInfo.size)) {
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.AddEntity,
					this.Xcn,
				),
					this.Wcn.clear();
				for (const e of this.SIe.OccupiedGridInfo) {
					var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
						e[0],
					);
					this.Wcn.add(e[0]), t?.IsInit && this.$cn(t);
				}
			}
			if (0 < this.SIe.DynamicGridInfo.length)
				for (const t of this.SIe.DynamicGridInfo) {
					var e = new JigsawIndex(t.LSs, t.RSs),
						o = MathUtils_1.MathUtils.LongToNumber(t.DSs);
					this.DynamicModifySocketState(e, o);
				}
		}
		OnEnd() {
			return (
				EventSystem_1.EventSystem.Has(
					EventDefine_1.EEventName.AddEntity,
					this.Xcn,
				) &&
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.AddEntity,
						this.Xcn,
					),
				this.Qcn &&
					(TimerSystem_1.TimerSystem.Remove(this.Qcn), (this.Qcn = void 0)),
				!0
			);
		}
		$cn(t) {
			var e = t.Entity.GetComponent(122),
				o = t.Entity.GetComponent(0),
				n = this.SIe.OccupiedGridInfo.get(o.GetPbDataId()).M3n,
				i = new JigsawIndex(n.tFn, n.rFn),
				a =
					((n = ((e.Rotation = n.oFn), this.GetBlockLocationByIndex(i))),
					Rotator_1.Rotator.Create(0, -e.Rotation, 0).Quaternion());
			(a = this.Hte?.ActorTransform.TransformRotation(a.ToUeQuat()).Rotator()),
				t.Entity.GetComponent(182)?.SetActorLocationAndRotation(
					n.ToUeVector(),
					a,
				),
				(n = this.Entity.GetComponent(145)),
				(a =
					n?.Config.Config.Type ?? IComponent_1.EItemFoundation.BuildingBlock);
			(t = t.Entity.GetComponent(140)) &&
				((t.ActivatedOutlet = n), (o.RelationId = this.SIe.GetPbDataId())),
				this.OnPutDownItem(e, i, a, !1, !0);
		}
		emn() {
			if (void 0 !== this.Config.ModelId) {
				var t = [],
					e = new Map();
				for (let i = 0; i < this.Config.JigsawConfig.Row; i++)
					for (let a = 0; a < this.Config.JigsawConfig.Column; a++) {
						var o = new JigsawIndex(i, a),
							n = [];
						if (this.Entity.GetComponent(117).IsInState(4))
							switch (this.GetBlockStateByIndex(o)) {
								case 2:
									n.push(-1375820440), t.push(o);
									break;
								case 1:
									n.push(-894208705), n.push(1248700469), t.push(o);
							}
						else
							switch (this.GetBlockStateByIndex(o)) {
								case 2:
									n.push(-1375820440), n.push(-2002333932), t.push(o);
									break;
								case 1:
									n.push(-894208705), n.push(-1270526641), t.push(o);
							}
						e.set(o.GetKey(), n);
					}
				this.Ncn.InitGenerateInfo(
					this.Config.ModelId.toString(),
					t,
					(t) => this.GetBlockLocationByIndex(t, !1),
					e,
				);
			} else this.Ncn.SetIsFinish(!0);
		}
		GetBlockLocationByIndex(t, e = !0) {
			if (
				!(
					t.Row >= this.Config.JigsawConfig.Row ||
					t.Col >= this.Config.JigsawConfig.Column
				)
			) {
				if (void 0 !== (o = this.kcn.get(t.GetKey())) && e) return o;
				var o = this.Config.JigsawConfig.Row,
					n = this.Config.JigsawConfig.Column,
					i =
						((n = (o = new JigsawIndex(o / 2 - 0.5, n / 2 - 0.5)).Row - t.Row),
						(o = o.Col - t.Col),
						this.Config.JigsawConfig.Size);
				i = Vector2D_1.Vector2D.Create(i, i).MultiplyEqual(
					Vector2D_1.Vector2D.Create(n, o),
				);
				let a = Vector_1.Vector.ZeroVectorProxy;
				return (
					e &&
						(a = Vector_1.Vector.Create(
							this.Config.PlaceOffset.X ?? 0,
							this.Config.PlaceOffset.Y ?? 0,
							this.Config.PlaceOffset.Z ?? 0,
						)),
					(n = new UE.Vector(i.X + a.X, -i.Y + a.Y, a.Z)),
					(o = Vector_1.Vector.Create(0, 0, 0)).FromUeVector(
						this.Hte.ActorTransform.TransformPosition(n),
					),
					e && this.kcn.set(t.GetKey(), o),
					o
				);
			}
		}
		CalcJigsawSocketLocation(t = !1) {
			var e,
				o,
				n,
				i,
				a,
				r,
				s,
				c = Vector_1.Vector.Create(
					CameraController_1.CameraController.CameraLocation,
				),
				l = Vector_1.Vector.Create(0, 0, 0);
			CameraController_1.CameraController.CameraRotator.Vector(l),
				l.Normalize();
			let h,
				m = MathUtils_1.MathUtils.MaxFloat;
			for ([e, o] of this.Ocn)
				0 === o.State ||
					(o.Occupancy && !t) ||
					((n = JigsawIndex.GenObjFromKey(e)),
					(i = this.GetBlockLocationByIndex(n)),
					(a = Vector_1.Vector.Create(c)),
					i.Subtraction(c, a),
					(i = Vector_1.Vector.Create(a)),
					a.Normalize(),
					(a = a.DotProduct(l)),
					(a = Math.acos(a) * (180 / Math.PI) * i.Size()) < m &&
						((m = a), (h = n)));
			return void 0 === h
				? [void 0, void 0]
				: ((r = Vector_1.Vector.Create(this.GetBlockLocationByIndex(h))),
					(s = this.Hte?.ActorTransform.InverseTransformPosition(
						r.ToUeVector(),
					)),
					r.FromUeVector(s),
					[r, h]);
		}
		CheckJigsawBlockIllegal(t, e) {
			if (t.Config.FillCfg.Type !== IComponent_1.EFillType.Direction)
				for (const n of t.GetActiveBlockOffset()) {
					var o = new JigsawIndex(e.Row + n.Row, e.Col + n.Col);
					if (
						void 0 === (o = this.Ocn.get(o.GetKey())) ||
						0 === o.State ||
						o.Occupancy
					)
						return !0;
				}
			return !1;
		}
		CheckJigsawBlockCorrect(t, e) {
			for (const n of t.GetActiveBlockOffset()) {
				var o = new JigsawIndex(e.Row + n.Row, e.Col + n.Col);
				if (1 !== this.Ocn.get(o.GetKey()).State) return !1;
			}
			return !0;
		}
		OnPutDownItem(t, e, o, n = !0, i = !1) {
			var a;
			if (
				0 ===
					(a =
						((a = t.Entity.GetComponent(139)) && a.UpdateBoxTrace(this, e),
						(t.PutDownIndex = e),
						t.OnPutDownToBase(this),
						this.Ocn.get(e.GetKey()))).State ||
				(a.Occupancy && o !== IComponent_1.EItemFoundation.PulseDevice)
			)
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SceneItem",
						32,
						"[SceneItemJigsawBaseComponent.OnputDownItem] 目标位置不可用",
					);
			else {
				EventSystem_1.EventSystem.EmitWithTarget(
					t.Entity,
					EventDefine_1.EEventName.OnModifyJigsawItemPutIndex,
					e,
					i,
				);
				let a = [];
				switch (t.Config.FillCfg.Type) {
					case IComponent_1.EFillType.Fixed:
						a = t.GetActiveBlockOffset();
						break;
					case IComponent_1.EFillType.Direction:
						a = this.tmn(e, t.Direction, t.Rotation);
				}
				for (const t of a) {
					var r = new JigsawIndex(e.Row + t.Row, e.Col + t.Col),
						s = r.GetKey(),
						c = this.Ocn.get(s);
					let n;
					o === IComponent_1.EItemFoundation.BuildingBlock &&
						0 !== c.State &&
						(c.Occupancy = !0),
						0 === c.ActivatedNum &&
							(2 === c.State
								? (n = -1279673628)
								: 1 === c.State && (n = 692213831)),
						(c.ActivatedNum += 1),
						0 < c.ActivatedNum && (c.Occupancy = !0),
						void 0 !== n && this.Ncn.AddTagsByIndex(r, n),
						o !== IComponent_1.EItemFoundation.PulseDevice ||
							s === e.GetKey() ||
							this.Fcn.has(s) ||
							(c.Occupancy = !1);
				}
				for (var [l, h] of (this.Fcn.set(e.GetKey(), t), this.Fcn))
					(l = JigsawIndex.GenObjFromKey(l)),
						this.Kcn.has(h.Entity) ||
							(this.Kcn.set(h.Entity, []), this.Qcn) ||
							(this.Qcn = TimerSystem_1.TimerSystem.Forever(this.Zcn, 500)),
						this.imn(l, h);
				n && (this.omn(t, !0), this.CheckFinish());
			}
		}
		CheckFinish() {
			switch (this.Config.CompleteCondition.Type) {
				case IComponent_1.EJigsawCompleteCondition.ActivateAllCorrectPiece:
					for (var [, t] of this.Ocn)
						if (1 === t.State && t.ActivatedNum <= 0) return;
					break;
				case IComponent_1.EJigsawCompleteCondition.PutInTheSpecifiedPiece:
					for (const t of this.Config.CompleteCondition.MatchList) {
						var e = JigsawIndex.GenKey(t.Index.RowIndex, t.Index.ColumnIndex);
						e = this.Fcn.get(e);
						if (!e?.Valid || e.CreatureDataComp.GetPbDataId() !== t.EntityId)
							return;
					}
					break;
				default:
					return;
			}
			this.SDe();
		}
		OnPickUpItem(t, e, o = !0) {
			var n,
				i,
				a = t.PutDownIndex;
			t.OnPickUpFormBase(this);
			let r = [];
			switch (t.Config.FillCfg.Type) {
				case IComponent_1.EFillType.Fixed:
					r = t.GetActiveBlockOffset();
					break;
				case IComponent_1.EFillType.Direction:
					r = this.tmn(a, t.Direction, t.Rotation);
			}
			for (const t of r) {
				var s = new JigsawIndex(a.Row + t.Row, a.Col + t.Col),
					c = s.GetKey();
				c = this.Ocn.get(c);
				let o;
				e === IComponent_1.EItemFoundation.BuildingBlock &&
					0 !== c.State &&
					(c.Occupancy = !1),
					--c.ActivatedNum,
					0 === c.ActivatedNum &&
						(2 === c.State
							? (o = -1279673628)
							: 1 === c.State && (o = 692213831),
						(c.Occupancy = !1)),
					void 0 !== o && this.Ncn.RemoveTagsByIndex(s, o);
			}
			let l = "";
			for ([n, i] of this.Fcn)
				if (i === t) {
					l = n;
					break;
				}
			"" !== l && this.Fcn.delete(l),
				this.RemoveMagnetTipsTag(a),
				this.Kcn.has(t.Entity) && this.Kcn.delete(t.Entity),
				o && this.omn(t, !1);
		}
		GetBlockStateByIndex(t) {
			return (t = t.GetKey()), this.Ocn.get(t).State;
		}
		AimBlockByIndex(t, e) {
			if (
				t?.GetKey() !== this.Vcn?.GetKey() ||
				e.Rotation !== this.jcn ||
				e !== this.Hcn
			) {
				var o = e.Entity.GetComponent(140),
					n =
						(o?.TryRemoveTagById(-2116928595),
						o?.TryAddTagById(-2116928595),
						this.rmn(),
						this.Jcn(),
						(this.Vcn = t),
						(this.Hcn = e),
						(this.jcn = e.Rotation),
						ResourceSystem_1.ResourceSystem.LoadAsync(
							ConfigManager_1.ConfigManager.ManipulateConfig
								.MatControllerDaPath,
							UE.ItemMaterialControllerActorData_C,
							(t) => {
								var o, n, i;
								t?.IsValid() &&
									((o = this.Hcn.Entity.GetComponent(182)),
									(n = new UE.Transform()),
									(i = this.GetBlockLocationByIndex(this.Vcn).ToUeVector()),
									n.SetLocation(i),
									(i = Rotator_1.Rotator.Create(
										0,
										-e.Rotation,
										0,
									).Quaternion()),
									(i = this.Hte?.ActorTransform.TransformRotation(
										i.ToUeQuat(),
									)),
									n.SetRotation(i),
									o.GetInteractionMainActor().MakeActorProjection(n, t));
							},
						),
						this.CheckJigsawBlockIllegal(e, t));
				for (const o of this.nmn(t, e)) {
					var i = new JigsawIndex(t.Row + o.Row, t.Col + o.Col);
					if ((i = this.Ncn.GetInteractionActorByIndex(i))) {
						var a = i.GetRefActorsByTag(
							GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
								n ? -1517802777 : -1817626386,
							),
						);
						for (let t = 0; t < a.Num(); t++)
							a.Get(t)?.SetActorHiddenInGame(!1);
					}
				}
			}
		}
		nmn(t, e, o) {
			switch (e.Config.FillCfg.Type) {
				case IComponent_1.EFillType.Fixed:
					return e.GetActiveBlockOffset(o);
				case IComponent_1.EFillType.Direction:
					return this.tmn(t, e.Direction, o ?? e.Rotation);
			}
			return [];
		}
		rmn() {
			this.ui ||
				(EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.HideJigsawBaseHint,
					this.Ycn,
				),
				(this.ui = !0));
		}
		zcn() {
			this.ui &&
				(EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.HideJigsawBaseHint,
					this.Ycn,
				),
				(this.ui = !1));
		}
		Jcn() {
			if (this.Vcn && this.Hcn) {
				this.Hcn.Entity.GetComponent(182)
					.GetInteractionMainActor()
					.RemoveActorProjection();
				var t = this.nmn(this.Vcn, this.Hcn, this.jcn);
				for (const o of t) {
					var e = new JigsawIndex(this.Vcn.Row + o.Row, this.Vcn.Col + o.Col);
					if ((e = this.Ncn.GetInteractionActorByIndex(e))) {
						let t = e.GetRefActorsByTag(
							GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
								-1517802777,
							),
						);
						for (let e = 0; e < t.Num(); e++)
							t.Get(e)?.SetActorHiddenInGame(!0);
						t = e.GetRefActorsByTag(
							GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
								-1817626386,
							),
						);
						for (let e = 0; e < t.Num(); e++)
							t.Get(e)?.SetActorHiddenInGame(!0);
					}
				}
			}
			(this.Vcn = void 0), (this.Hcn = void 0);
		}
		omn(t, e) {
			var o = Protocol_1.Aki.Protocol.zKn.create(),
				n = Protocol_1.Aki.Protocol.AGs.create(),
				i = Protocol_1.Aki.Protocol.PGs.create(),
				a = Protocol_1.Aki.Protocol.VBs.create(),
				r = Protocol_1.Aki.Protocol.iws.create(),
				s = t.Entity,
				c = (l = s.GetComponent(182)).ActorLocationProxy,
				l = l.ActorRotationProxy;
			(n.tFn = t.PutDownIndex.Row),
				(n.rFn = t.PutDownIndex.Col),
				(n.oFn = t.Rotation),
				(a.X = c.X),
				(a.Y = c.Y),
				(a.Z = c.Z),
				(r.Pitch = l.Pitch),
				(r.Roll = l.Roll),
				(r.Yaw = l.Yaw),
				(i.M3n = a),
				(i.S3n = r),
				(o.Zkn = MathUtils_1.MathUtils.NumberToLong(
					this.SIe.GetCreatureDataId(),
				)),
				(o.eFn = MathUtils_1.MathUtils.NumberToLong(
					s.GetComponent(0).GetCreatureDataId(),
				)),
				(o.nFn = e ? 1 : 0),
				(o.iFn = n),
				(o.p7n = i),
				Net_1.Net.Call(6099, o, (t) => {
					t.X5n !== Protocol_1.Aki.Protocol.lkn.Sys &&
						ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							t.X5n,
							6787,
						);
				});
		}
		SDe() {
			var t = Protocol_1.Aki.Protocol.tQn.create();
			(t.sFn = MathUtils_1.MathUtils.NumberToLong(
				this.SIe.GetCreatureDataId(),
			)),
				Net_1.Net.Call(2604, t, (t) => {
					t.X5n === Protocol_1.Aki.Protocol.lkn.Sys && this.OnFinish();
				});
		}
		OnFinish() {
			for (var [t, e] of this.Ocn)
				1 === e.State &&
					this.Ncn.AddTagsByIndex(JigsawIndex.GenObjFromKey(t), 1248700469),
					0 !== e.State &&
						(this.Ncn.RemoveTagsByIndex(
							JigsawIndex.GenObjFromKey(t),
							692213831,
						),
						this.Ncn.RemoveTagsByIndex(
							JigsawIndex.GenObjFromKey(t),
							-1270526641,
						),
						this.Ncn.RemoveTagsByIndex(
							JigsawIndex.GenObjFromKey(t),
							-1279673628,
						),
						this.Ncn.RemoveTagsByIndex(
							JigsawIndex.GenObjFromKey(t),
							-2002333932,
						));
			for (const t of this.Fcn) t[1].OnFinish();
		}
		tmn(t, e, o) {
			let n = [new JigsawIndex(0, 0)];
			return (
				this.smn(e, 1) && (n = n.concat(this.amn(t, o))),
				this.smn(e, 2) && (n = n.concat(this.amn(t, o + 180))),
				this.smn(e, 3) && (n = n.concat(this.amn(t, o + 90))),
				this.smn(e, 4) ? n.concat(this.amn(t, o + 270)) : n
			);
		}
		smn(t, e) {
			return 1 == ((t >> e) & 1);
		}
		amn(t, e) {
			var o = [],
				n = [
					{ RowDelta: -1, ColDelta: 0 },
					{ RowDelta: 0, ColDelta: -1 },
					{ RowDelta: 1, ColDelta: 0 },
					{ RowDelta: 0, ColDelta: 1 },
				],
				i = ((Math.floor(e / 90) % 4) + 4) % 4;
			for (
				let e = 0;
				e < this.Config.JigsawConfig.Row * this.Config.JigsawConfig.Column;
				e++
			) {
				var a = t.Row + n[i].RowDelta * e,
					r = t.Col + n[i].ColDelta * e;
				if (
					a < 0 ||
					a >= this.Config.JigsawConfig.Row ||
					r < 0 ||
					r >= this.Config.JigsawConfig.Column
				)
					break;
				var s = this.Ocn.get(JigsawIndex.GenKey(a, r));
				if (s && 0 === s.State) break;
				o.push(new JigsawIndex(a - t.Row, r - t.Col));
			}
			return o;
		}
		GetNextPosByDirection(t, e, o) {
			var n = new JigsawIndex(t.Row, t.Col),
				i = Vector_1.Vector.Create(e),
				a =
					((r = Vector_1.Vector.Create(this.Hte.ActorUpProxy)).Normalize(),
					Vector_1.Vector.Create()),
				r =
					((e = e.DotProduct(r)),
					r.Multiply(e, a),
					i.SubtractionEqual(a),
					i.Normalize(),
					Vector_1.Vector.Create(0, 0, 0)),
				s =
					((e =
						(this.Hte.ActorQuatProxy.RotateVector(
							Vector_1.Vector.BackwardVectorProxy,
							r,
						),
						Vector_1.Vector.Create(0, 0, 0))),
					this.Hte.ActorQuatProxy.RotateVector(
						Vector_1.Vector.LeftVectorProxy,
						e,
					),
					o.GetComponent(139));
			for (const o of [
				{ Vector: this.Hte.ActorForwardProxy, RowDelta: -1, ColDelta: 0 },
				{ Vector: this.Hte.ActorRightProxy, RowDelta: 0, ColDelta: 1 },
				{ Vector: r, RowDelta: 1, ColDelta: 0 },
				{ Vector: e, RowDelta: 0, ColDelta: -1 },
			])
				if (MathUtils_1.MathUtils.DotProduct(i, o.Vector) > COS_45) {
					for (
						;
						0 <= n.Row &&
						n.Row < this.Config.JigsawConfig.Row &&
						0 <= n.Col &&
						n.Col < this.Config.JigsawConfig.Column;
					)
						if (
							((n.Row += o.RowDelta),
							(n.Col += o.ColDelta),
							this.Ocn.has(n.GetKey()))
						) {
							var c,
								l = this.Ocn.get(n.GetKey());
							if (0 !== l.State)
								return (
									(c = this.GetBlockLocationByIndex(n)),
									s?.StartBoxTrace(c) || 0 !== l.ActivatedNum ? t : n
								);
						}
					return t;
				}
			return n;
		}
		OnItemMove(t, e) {
			this.OnPickUpItem(t, IComponent_1.EItemFoundation.BuildingBlock, !1),
				this.OnPutDownItem(
					t,
					e,
					IComponent_1.EItemFoundation.BuildingBlock,
					!1,
				),
				this.RequestMoveItem(t),
				this.CheckFinish();
		}
		RequestMoveItem(t) {
			var e = Protocol_1.Aki.Protocol.oQn.create(),
				o = Protocol_1.Aki.Protocol.AGs.create(),
				n = Protocol_1.Aki.Protocol.PGs.create(),
				i = Protocol_1.Aki.Protocol.VBs.create(),
				a = Protocol_1.Aki.Protocol.iws.create(),
				r = t.Entity,
				s = (c = r.GetComponent(182)).ActorLocationProxy,
				c = c.ActorRotationProxy;
			(o.tFn = t.PutDownIndex.Row),
				(o.rFn = t.PutDownIndex.Col),
				(o.oFn = t.Rotation),
				(i.X = s.X),
				(i.Y = s.Y),
				(i.Z = s.Z),
				(a.Pitch = c.Pitch),
				(a.Roll = c.Roll),
				(a.Yaw = c.Yaw),
				(n.M3n = i),
				(n.S3n = a),
				(e.Zkn = MathUtils_1.MathUtils.NumberToLong(
					this.SIe.GetCreatureDataId(),
				)),
				(e.eFn = MathUtils_1.MathUtils.NumberToLong(
					r.GetComponent(0).GetCreatureDataId(),
				)),
				(e.iFn = o),
				(e.p7n = n),
				Net_1.Net.Call(22923, e, (t) => {
					switch (t.X5n) {
						case Protocol_1.Aki.Protocol.lkn.Sys:
						case Protocol_1.Aki.Protocol.lkn.Proto_ErrGridPosAlreadyOccupied:
							break;
						default:
							ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								t.X5n,
								17305,
							);
					}
				});
		}
		RemoveMagnetTipsTag(t) {
			this.Ncn.RemoveTagsByIndex(t, 1531999982),
				this.Ncn.RemoveTagsByIndex(t, -1705770981),
				this.Ncn.RemoveTagsByIndex(t, -230062685),
				this.Ncn.RemoveTagsByIndex(t, -447552724);
		}
		imn(t, e) {
			if (1 !== this.Ocn.get(t.GetKey()).State) {
				var o = e.Entity.GetComponent(139),
					n = [];
				for (const e of [
					{ Tag: 1531999982, RowDelta: -1, ColDelta: 0 },
					{ Tag: -1705770981, RowDelta: 1, ColDelta: 0 },
					{ Tag: -230062685, RowDelta: 0, ColDelta: -1 },
					{ Tag: -447552724, RowDelta: 0, ColDelta: 1 },
				]) {
					let r = !1;
					for (
						var i = new JigsawIndex(t.Row, t.Col);
						0 <= i.Row &&
						i.Row < this.Config.JigsawConfig.Row &&
						0 <= i.Col &&
						i.Col < this.Config.JigsawConfig.Column;
					)
						if (
							((i.Row += e.RowDelta),
							(i.Col += e.ColDelta),
							this.Ocn.has(i.GetKey()))
						) {
							var a = this.Ocn.get(i.GetKey());
							if (0 !== a.State) {
								0 === a.ActivatedNum &&
									((a = this.GetBlockLocationByIndex(i)),
									n.push(new BoxTraceCheckData(a, e.Tag, t)),
									o?.StartBoxTrace(a) ||
										((r = !0), this.Ncn.HasTagByIndex(t, e.Tag)) ||
										this.Ncn.AddTagsByIndex(t, e.Tag));
								break;
							}
						}
					r || this.Ncn.RemoveTagsByIndex(t, e.Tag);
				}
				this.Kcn.set(e.Entity, n);
			}
		}
		HasEmptySocket() {
			for (var [, t] of this.Ocn) if (0 !== t.State && !t.Occupancy) return !0;
			return !1;
		}
		DynamicModifySocketState(t, e) {
			var o = this.Ocn.get(t.GetKey());
			if (o.State !== e) {
				var n,
					i,
					a = [];
				for ([n, i] of (0 === o.State
					? (a.push(1 === e ? -894208705 : -1375820440),
						this.Ncn.DynamicAddActorByIndex(t, a))
					: 0 !== e
						? (1 === o.State
								? this.Ncn.RemoveTagsByIndex(t, -894208705)
								: 2 === o.State && this.Ncn.RemoveTagsByIndex(t, -1375820440),
							1 === e
								? this.Ncn.AddTagsByIndex(t, -894208705)
								: this.Ncn.AddTagsByIndex(t, -1375820440))
						: this.Ncn.DynamicRemoveActorByIndex(t),
				(o.State = e),
				this.Fcn))
					this.imn(JigsawIndex.GenObjFromKey(n), i);
			}
		}
		GetAllItemOnBase() {
			var t,
				e = [];
			for ([, t] of this.Fcn) e.push(t);
			return e;
		}
		GetPutItemIndex(t) {
			let e = "";
			for (var [o, n] of this.Fcn) n === t && (e = o);
			if ("" !== e) return JigsawIndex.GenObjFromKey(e);
		}
	});
(SceneItemJigsawBaseComponent = SceneItemJigsawBaseComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(121)],
		SceneItemJigsawBaseComponent,
	)),
	(exports.SceneItemJigsawBaseComponent = SceneItemJigsawBaseComponent);
