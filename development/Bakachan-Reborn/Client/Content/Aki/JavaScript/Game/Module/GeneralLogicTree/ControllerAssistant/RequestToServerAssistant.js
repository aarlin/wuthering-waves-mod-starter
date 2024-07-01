"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RequestToServerAssistant = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../../Core/Net/Net"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	CharacterController_1 = require("../../../NewWorld/Character/CharacterController"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	TimeOfDayController_1 = require("../../TimeOfDay/TimeOfDayController"),
	GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine"),
	GeneralLogicTreeUtil_1 = require("../GeneralLogicTreeUtil"),
	ControllerAssistantBase_1 = require("./ControllerAssistantBase");
class RequestToServerAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
	constructor() {
		super(...arguments),
			(this.FGn = new Map()),
			(this.VGn = new Map()),
			(this.iut = !1),
			(this.zpe = (e, o) => {
				var r = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
					t = (this.HGn(r, o.PbDataId), this.GetEntityPos(o, !0));
				this.jGn(r, o.PbDataId, t);
			});
	}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RemoveEntity,
			this.zpe,
		);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RemoveEntity,
			this.zpe,
		);
	}
	OnDestroy() {
		this.FGn.clear(), this.VGn.clear();
	}
	RequestSubmitNode(e, o, r = 0) {
		var t,
			n = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetNodeConfig(
				e.BtType,
				e.TreeConfigId,
				e.NodeId,
			);
		n
			? "ChildQuest" !== n.Type
				? o(!1)
				: ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
							n.Condition.PreConditions,
							void 0,
						)
					? (TimeOfDayController_1.TimeOfDayController.SyncServerGameTime(
							ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second,
						),
						(n =
							ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
								e.TreeIncId,
							)),
						((t = Protocol_1.Aki.Protocol.iKn.create()).T5n = n ?? 0),
						(t.L5n = MathUtils_1.MathUtils.BigIntToLong(e.TreeIncId)),
						(t.Jkn = e.NodeId),
						Net_1.Net.Call(21993, t, (e) => {
							var r;
							e.uvs !== Protocol_1.Aki.Protocol.lkn.Sys &&
								e.uvs !==
									Protocol_1.Aki.Protocol.lkn.Proto_ErrTreeNodeNotActive &&
								((r =
									ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
										e.uvs,
									)),
								Log_1.Log.CheckInfo()) &&
								Log_1.Log.Info("GeneralLogicTree", 19, r),
								o(e.uvs === Protocol_1.Aki.Protocol.lkn.Sys);
						}))
					: ((n =
							ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
								Protocol_1.Aki.Protocol.lkn.Proto_ErrPreCondition,
							)),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("GeneralLogicTree", 19, n),
						o(!1))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"GeneralLogicTree",
						19,
						"提交节点失败,找不到节点配置",
						["TreeType", GeneralLogicTreeDefine_1.btTypeLogString[e.BtType]],
						["TreeId", e.TreeConfigId],
						["NodeId", e.NodeId],
					),
				o(!1));
	}
	RequestSetTimerInfo(e, o, r, t, n) {
		var i =
			ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
				e,
			);
		i = Protocol_1.Aki.Protocol.sKn.create({
			T5n: i,
			L5n: MathUtils_1.MathUtils.BigIntToLong(e),
			Jkn: o,
			y5n: r,
			A5n: t,
			akn: n,
		});
		Net_1.Net.Call(14526, i, (o) => {
			o.uvs !== Protocol_1.Aki.Protocol.lkn.Sys &&
				ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					o.uvs,
					21520,
				),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.GeneralLogicTreeTimerInfoChanged,
					e,
					r,
					t,
					n,
				);
		});
	}
	RequestGiveUp(e, o) {
		var r,
			t = ModelManager_1.ModelManager.GeneralLogicTreeModel,
			n = t.GetBehaviorTree(e);
		n && (r = n.GetProcessingFailedNode()) && n.CheckCanGiveUp()
			? ((n = t.GetBehaviorTreeOwnerId(e)),
				(t = Protocol_1.Aki.Protocol.gKn.create({
					T5n: n,
					L5n: MathUtils_1.MathUtils.BigIntToLong(e),
					Jkn: r.NodeId,
				})),
				Net_1.Net.Call(15815, t, (e) => {
					e.uvs !== Protocol_1.Aki.Protocol.lkn.Sys &&
						ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.uvs,
							10737,
						),
						o(!0);
				}))
			: o(!1);
	}
	RequestRollback(e, o) {
		var r =
			ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
		r
			? r.GetProcessingFailedNode()?.NeedSecondaryConfirm
				? o === Protocol_1.Aki.Protocol.gvs.Proto_Transfer
					? this.QXt(e, !1)
					: ((r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(77)).FunctionMap.set(
							1,
							() => {
								this.QXt(e, !1);
							},
						),
						r.FunctionMap.set(2, () => {
							this.QXt(e, !0);
						}),
						(r.FinishOpenFunction = (o) => {
							o || this.QXt(e, !1);
						}),
						ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
							r,
						))
				: this.QXt(e, !0)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("GeneralLogicTree", 19, "请求回退失败，行为树不存在", [
					"treeId",
					e,
				]);
	}
	QXt(e, o) {
		var r =
			ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
		r
			? (r.SetRollbackWaiting(!1),
				(r =
					ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
						e,
					)),
				(r = Protocol_1.Aki.Protocol.pKn.create({
					T5n: r,
					L5n: MathUtils_1.MathUtils.BigIntToLong(e),
					U5n: o ? 1 : 2,
				})),
				Net_1.Net.Call(17313, r, (e) => {
					e.uvs !== Protocol_1.Aki.Protocol.lkn.Sys &&
						ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.uvs,
							8081,
							void 0,
							!1,
						);
				}))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("GeneralLogicTree", 19, "请求回退失败，行为树不存在", [
					"treeId",
					e,
				]);
	}
	RequestTimerEnd(e, o) {
		var r =
			ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
				e,
			);
		r = Protocol_1.Aki.Protocol.AKn.create({
			T5n: r,
			L5n: MathUtils_1.MathUtils.BigIntToLong(e),
			y5n: o,
		});
		Net_1.Net.Call(20600, r, (e) => {
			e.uvs !== Protocol_1.Aki.Protocol.lkn.Sys &&
				((e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
					e.uvs,
				)),
				Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info("GeneralLogicTree", 19, e);
		});
	}
	RequestFinishUiGameplay(e, o) {
		var r = Protocol_1.Aki.Protocol.UKn.create();
		(r.ykn = o),
			(r.Ikn = e),
			Net_1.Net.Call(19172, r, (e) => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Quest",
						19,
						"GeneralLogicTree:RequestFinishUiGameplay",
						["gameplayId", o],
					);
			});
	}
	RequestForcedOccupation(e, o) {
		var r = Protocol_1.Aki.Protocol.mKn.create({
			L5n: MathUtils_1.MathUtils.BigIntToLong(e),
		});
		Net_1.Net.Call(29440, r, (r) => {
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Quest",
					19,
					"GeneralLogicTree:RequestForcedOccupation",
					["treeId", e],
				),
				o();
		});
	}
	RequestEntityPosition(e, o, r) {
		r = r ?? Vector_1.Vector.Create();
		var t = this.WGn(e, o);
		return (
			t
				? r.Set(t.X, t.Y, t.Z)
				: ((t = this.KGn(e, o)) && r.Set(t.X, t.Y, t.Z),
					this.iut ||
						((t = Protocol_1.Aki.Protocol.Sms.create({ R5n: o, x5n: e })),
						(this.iut = !0),
						Net_1.Net.Call(29784, t, (r) => {
							r?.lkn === Protocol_1.Aki.Protocol.lkn.Sys &&
								((r = Vector_1.Vector.Create(r.M3n)), this.QGn(e, o, r)),
								(this.iut = !1);
						}))),
			r
		);
	}
	GetEntityPos(e, o, r) {
		r = r ?? Vector_1.Vector.Create();
		var t = CharacterController_1.CharacterController.GetActorComponent(e);
		if (t && ObjectUtils_1.ObjectUtils.IsValid(t.Owner)) {
			if (t.SkeletalMesh) {
				r.FromUeVector(t.SkeletalMesh.K2_GetComponentLocation());
				const o = e.Entity.GetComponent(0),
					n = o?.GetPbModelConfig();
				n && r.Set(r.X, r.Y, r.Z + n.HalfHeight);
			} else r.FromUeVector(t.Owner.K2_GetActorLocation());
			const n = e.Entity.GetComponent(0);
			if (n && o) {
				const e = n.GetPbModelConfig();
				e &&
					(e.TrackHeight
						? r.Set(r.X, r.Y, r.Z + e.TrackHeight)
						: (0, RegisterComponent_1.isComponentInstance)(t, 3) &&
							r.Set(r.X, r.Y, r.Z + t.ScaledHalfHeight));
			}
		}
		return r;
	}
	WGn(e, o) {
		if ((e = this.FGn.get(e))) return e.get(o);
	}
	HGn(e, o) {
		(e = this.FGn.get(e)) && e.delete(o);
	}
	QGn(e, o, r) {
		let t = this.FGn.get(e);
		t || ((t = new Map()), this.FGn.set(e, t)), t.set(o, r);
	}
	KGn(e, o) {
		if ((e = this.VGn.get(e))) return e.get(o);
	}
	jGn(e, o, r) {
		let t = this.VGn.get(e);
		t || ((t = new Map()), this.VGn.set(e, t)), t.set(o, r);
	}
}
exports.RequestToServerAssistant = RequestToServerAssistant;
