"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AlterMarksView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	SneakController_1 = require("../../../World/Controller/SneakController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	AlterMark_1 = require("./AlterMark"),
	AlterTime_1 = require("./AlterTime"),
	AlterTipMark_1 = require("./AlterTipMark"),
	BattleChildView_1 = require("./BattleChildView/BattleChildView"),
	EavesdropMark_1 = require("./EavesdropMark"),
	StalkAlertMark_1 = require("./StalkAlertMark");
class AlterMarksView extends BattleChildView_1.BattleChildView {
	constructor() {
		super(...arguments),
			(this.bXe = new Map()),
			(this.qXe = new Map()),
			(this.GXe = new Map()),
			(this.lqn = new Map()),
			(this.NXe = new Map()),
			(this.OXe = !1),
			(this.kXe = 0),
			(this.FXe = 0),
			(this.VXe = 0),
			(this.HXe = void 0),
			(this.jXe = void 0),
			(this.WXe = void 0),
			(this.KXe = void 0),
			(this.QXe = !1),
			(this.XXe = (e, t, i) => {
				this.bXe.has(e) ||
					(this.NXe.has(e)
						? 1 === this.NXe.get(e).Type && this.NXe.delete(e)
						: this.NXe.set(e, { Type: 0, OriginPosition: t, TrackActor: i }));
			}),
			(this.$Xe = (e) => {
				var t = this.bXe.get(e),
					i = this.NXe.has(e);
				(t || i) &&
					(i
						? this.NXe.delete(e)
						: t &&
							this.NXe.set(e, {
								Type: 1,
								OriginPosition: void 0,
								TrackActor: void 0,
							}));
			}),
			(this.YXe = (e, t) => {
				this.GXe.has(e) ||
					((t = new StalkAlertMark_1.StalkAlertMark(
						this.RootItem,
						t,
					)).InitEntityId(e),
					0 === this.GXe.size && this.SetActive(!0),
					this.GXe.set(e, t));
			}),
			(this.JXe = (e) => {
				var t = this.GXe.get(e);
				t &&
					(t.Destroy(),
					this.GXe.delete(e),
					0 !== this.GXe.size ||
						SneakController_1.SneakController.IsSneaking ||
						this.SetActive(!1));
			}),
			(this._qn = (e, t) => {
				this.lqn.has(e) ||
					((t = new EavesdropMark_1.EavesdropMark(t, e)).Initialize(
						UiLayer_1.UiLayer.WorldSpaceUiRootItem,
					),
					this.lqn.set(e, t));
			}),
			(this.uqn = (e) => {
				var t = this.lqn.get(e);
				t && (t.Destroy(), this.lqn.delete(e));
			}),
			(this.cqn = (e) => {
				for (var [t, i] of this.lqn)
					t === e ? i.PlayFoundSeq() : i.PlayEndSeq();
			}),
			(this.zXe = (e, t) => {
				if (e) {
					for (var [, i] of (this.OXe || this.ZXe(), this.bXe)) i.Destroy();
					for (var [, n] of this.GXe) n.Destroy();
					this.bXe.clear(),
						this.GXe.clear(),
						(this.OXe = !0),
						(this.kXe = t),
						EventSystem_1.EventSystem.Has(
							EventDefine_1.EEventName.OnChildQuestNodeFinish,
							this.Uxe,
						) ||
							EventSystem_1.EventSystem.Add(
								EventDefine_1.EEventName.OnChildQuestNodeFinish,
								this.Uxe,
							);
				} else this.QXe || this.e$e(), (this.OXe = !1);
				this.jXe.SetUiActive(this.OXe), this.Zpe(e);
			}),
			(this.Uxe = () => {
				this.t$e();
			}),
			(this.lne = (e, t) => {
				this.HXe?.SetUIActive(t);
			}),
			(this.xie = () => {
				var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
				this.i$e(e), this.KXe && this.o$e(e.EntityHandle);
			}),
			(this.r$e = () => {
				this.SetActive(!0);
			}),
			(this.n$e = () => {
				0 === this.GXe.size && this.SetActive(!1);
			}),
			(this.Zpe = (e) => {
				for (var [, t] of this.qXe) t.Destroy();
				if ((this.qXe.clear(), e)) {
					if (this.OXe) {
						this.KXe
							? (e =
									ModelManager_1.ModelManager.SceneTeamModel
										.GetCurrentEntity) !== this.KXe && this.o$e(e)
							: ((this.KXe =
									ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
								EventSystem_1.EventSystem.AddWithTarget(
									this.KXe.Entity,
									EventDefine_1.EEventName.AiHateAddOrRemove,
									this.s$e,
								));
						for (const e of this.KXe.Entity.CheckGetComponent(
							158,
						).GetAggroSet()) {
							var i =
								ModelManager_1.ModelManager.CreatureModel.GetEntityById(
									e,
								).Entity.CheckGetComponent(1).Owner;
							this.qXe.has(e) ||
								((i = new AlterTipMark_1.AlterTipMark(this.RootItem, i, !0)),
								this.qXe.set(e, i),
								i.ChangeToError());
						}
					}
				} else
					this.KXe &&
						(EventSystem_1.EventSystem.RemoveWithTarget(
							this.KXe.Entity,
							EventDefine_1.EEventName.AiHateAddOrRemove,
							this.s$e,
						),
						(this.KXe = void 0));
			}),
			(this.s$e = (e, t) => {
				var i = t.CharActorComp.Owner;
				t = t.CharActorComp.Entity.Id;
				!this.qXe.has(t) &&
					e &&
					this.OXe &&
					((e = new AlterTipMark_1.AlterTipMark(this.RootItem, i, !0)),
					this.qXe.set(t, e),
					e.ChangeToError());
			}),
			(this.a$e = (e) => {
				(e = this.GXe.get(e)) &&
					(e.SetAlertIcon(
						"/Game/Aki/UI/UIResources/Common/Atlas/SP_ComIconSign.SP_ComIconSign",
					),
					e.StopUpdateAlertValue(),
					e.ActivateAlertEffect());
			}),
			(this.h$e = () => {
				for (var [, e] of this.GXe) e.Destroy();
				this.GXe.clear();
			});
	}
	Initialize(e, t) {
		super.Initialize(e),
			this.e$e(),
			this.l$e(),
			this.mqn(),
			this.ProcessPendingMarkInfo(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
				this.xie,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSneakFoundChange,
				this.zXe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SneakStart,
				this.r$e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SneakEnd,
				this.n$e,
			),
			(ModelManager_1.ModelManager.AlertMarkModel.AlertMarkInit = !0),
			CommonParamById_1.configCommonParamById.GetBoolConfig("ShowSneakMask") &&
				((e = UiLayer_1.UiLayer.GetLayerRootUiItem(
					UiLayerType_1.ELayerType.HUD,
				)),
				LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
					"UiItem_Sneakzhezhao",
					e,
				).then(
					(e) => {
						(this.HXe = e.GetComponentByClass(UE.UIItem.StaticClass())),
							this.HXe.SetHierarchyIndex(0),
							this.HXe.SetUIActive(!1);
					},
					() => {},
				)),
			(this.jXe = new AlterTime_1.AlterTime()),
			this.jXe.CreateByResourceIdAsync("UiItem_Sneakshijian", this.RootItem),
			(e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()),
			this.i$e(e),
			this.SetActive(!1);
	}
	i$e(e) {
		this.WXe && this.WXe.EndTask(),
			(e = e?.GameplayTagComponent),
			e
				? (this.WXe = e.ListenForTagAddOrRemove(
						2019420593,
						this.lne,
						AlterMarksView._$e,
					))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("UiCommon", 32, "获取当前角色BaseTagComponent失败");
	}
	Reset() {
		for (var [, e] of (super.Reset(),
		this.ZXe(),
		this.u$e(),
		this.dqn(),
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
			this.xie,
		),
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnSneakFoundChange,
			this.zXe,
		),
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.SneakStart,
			this.r$e,
		),
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.SneakEnd,
			this.n$e,
		),
		EventSystem_1.EventSystem.Has(
			EventDefine_1.EEventName.OnChildQuestNodeFinish,
			this.Uxe,
		) &&
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChildQuestNodeFinish,
				this.Uxe,
			),
		this.KXe &&
			(EventSystem_1.EventSystem.RemoveWithTarget(
				this.KXe.Entity,
				EventDefine_1.EEventName.AiHateAddOrRemove,
				this.s$e,
			),
			(this.KXe = void 0)),
		this.bXe))
			e.Destroy();
		for (var [, t] of (this.bXe.clear(), this.GXe)) t.Destroy();
		this.GXe.clear();
	}
	Update(e) {
		for (var [, t] of (this.c$e(), this.bXe)) t.Update();
		for (var [, i] of this.qXe) i.Update();
		for (var [, n] of this.lqn) n.Update();
		for (var [, s] of this.GXe) s.CheckShowUiCondition() && s.Update();
		this.OXe &&
			((this.VXe =
				TimeUtil_1.TimeUtil.GetServerTimeStamp() /
				TimeUtil_1.TimeUtil.InverseMillisecond),
			(this.FXe =
				(this.kXe - this.VXe) * TimeUtil_1.TimeUtil.InverseMillisecond),
			this.FXe < 0 ? this.t$e() : this.jXe.SetCountdownText(this.FXe));
	}
	c$e() {
		for (var [e, t] of this.NXe) {
			var i;
			0 === t.Type
				? ((i = new AlterMark_1.AlterMark(
						this.RootItem,
						t.OriginPosition || Vector_1.Vector.Create(),
						t.TrackActor,
					)),
					this.bXe.set(e, i),
					this.YXe(e, t.TrackActor))
				: ((i = this.bXe.get(e)) && (i.Destroy(), this.bXe.delete(e)),
					this.JXe(e));
		}
		this.NXe.clear();
	}
	t$e() {
		this.OXe && ((this.OXe = !1), this.jXe.SetUiActive(this.OXe));
	}
	mqn() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.AddEavesdropMark,
			this._qn,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveEavesdropMark,
				this.uqn,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnEavesdropFound,
				this.cqn,
			);
	}
	dqn() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.AddEavesdropMark,
			this._qn,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveEavesdropMark,
				this.uqn,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnEavesdropFound,
				this.cqn,
			);
	}
	l$e() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.AddStalkAlertMark,
			this.YXe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveStalkAlertMark,
				this.JXe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnStalkFound,
				this.a$e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnStalkFailed,
				this.h$e,
			);
	}
	u$e() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.AddStalkAlertMark,
			this.YXe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveStalkAlertMark,
				this.JXe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnStalkFound,
				this.a$e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnStalkFailed,
				this.h$e,
			);
	}
	e$e() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.AddAlterMark,
			this.XXe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveAlterMark,
				this.$Xe,
			),
			(this.QXe = !0);
	}
	ZXe() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.AddAlterMark,
			this.XXe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveAlterMark,
				this.$Xe,
			),
			(this.QXe = !1);
	}
	o$e(e) {
		EventSystem_1.EventSystem.HasWithTarget(
			this.KXe.Entity,
			EventDefine_1.EEventName.AiHateAddOrRemove,
			this.s$e,
		) &&
			(EventSystem_1.EventSystem.RemoveWithTarget(
				this.KXe.Entity,
				EventDefine_1.EEventName.AiHateAddOrRemove,
				this.s$e,
			),
			(this.KXe = e),
			EventSystem_1.EventSystem.AddWithTarget(
				this.KXe.Entity,
				EventDefine_1.EEventName.AiHateAddOrRemove,
				this.s$e,
			));
	}
	ProcessPendingMarkInfo() {
		if (
			0 !== ModelManager_1.ModelManager.AlertMarkModel.PendingMarkInfos.size
		) {
			for (var [e, [t, i]] of ModelManager_1.ModelManager.AlertMarkModel
				.PendingMarkInfos)
				switch (i) {
					case 2:
						this.YXe(e, t);
						break;
					case 3:
						this._qn(e, t);
				}
			ModelManager_1.ModelManager.AlertMarkModel?.PendingMarkInfos.clear();
		}
	}
	OnBattleHudVisibleChanged(e) {
		SneakController_1.SneakController.IsSneaking && this.SetActive(e);
	}
}
(exports.AlterMarksView = AlterMarksView)._$e = void 0;
