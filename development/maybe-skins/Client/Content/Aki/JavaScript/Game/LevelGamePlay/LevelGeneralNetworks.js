"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelGeneralNetworks = exports.WAIT_ENTITY_ERROR_TIME = void 0);
const Log_1 = require("../../Core/Common/Log"),
	Protocol_1 = require("../../Core/Define/Net/Protocol"),
	Net_1 = require("../../Core/Net/Net"),
	GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils"),
	MathUtils_1 = require("../../Core/Utils/MathUtils"),
	IComponent_1 = require("../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	ModelManager_1 = require("../Manager/ModelManager"),
	GeneralLogicTreeDefine_1 = require("../Module/GeneralLogicTree/Define/GeneralLogicTreeDefine"),
	TsInteractionUtils_1 = require("../Module/Interaction/TsInteractionUtils"),
	WorldMapController_1 = require("../Module/WorldMap/WorldMapController"),
	SceneItemDynamicAttachTargetComponent_1 = require("../NewWorld/SceneItem/Common/Component/SceneItemDynamicAttachTargetComponent"),
	SceneItemJigsawBaseComponent_1 = require("../NewWorld/SceneItem/Jigsaw/SceneItemJigsawBaseComponent"),
	SceneItemUtility_1 = require("../NewWorld/SceneItem/Util/SceneItemUtility"),
	GameModeController_1 = require("../World/Controller/GameModeController"),
	WaitEntityTask_1 = require("../World/Define/WaitEntityTask"),
	LevelGamePlayUtils_1 = require("./LevelGamePlayUtils"),
	LevelGeneralContextDefine_1 = require("./LevelGeneralContextDefine"),
	LevelGeneralContextUtil_1 = require("./LevelGeneralContextUtil"),
	LevelGeneralController_1 = require("./LevelGeneralController");
exports.WAIT_ENTITY_ERROR_TIME = 9e4;
class LevelGeneralNetworks {
	static Register() {
		Net_1.Net.Register(29653, this.QUe),
			Net_1.Net.Register(2821, LevelGeneralNetworks.XUe),
			Net_1.Net.Register(24649, LevelGeneralNetworks.$Ue),
			Net_1.Net.Register(13620, LevelGeneralNetworks.YUe),
			Net_1.Net.Register(2956, LevelGeneralNetworks.JUe),
			Net_1.Net.Register(6737, this.zUe),
			Net_1.Net.Register(11508, this.ZUe),
			Net_1.Net.Register(5744, this.tBn),
			Net_1.Net.Register(12225, this.eAe),
			Net_1.Net.Register(29374, this.tAe),
			Net_1.Net.Register(6271, this.iAe),
			Net_1.Net.Register(16317, this.oAe),
			Net_1.Net.Register(4137, this.rAe),
			Net_1.Net.Register(13156, this.nAe),
			Net_1.Net.Register(28949, this.sAe),
			Net_1.Net.Register(9995, this.aAe),
			Net_1.Net.Register(2532, this.hAe),
			Net_1.Net.Register(25911, this.lAe),
			Net_1.Net.Register(22332, this._Ae),
			Net_1.Net.Register(10380, this.uAe),
			Net_1.Net.Register(6817, this.WTn);
	}
	static UnRegister() {
		Net_1.Net.UnRegister(29653),
			Net_1.Net.UnRegister(2821),
			Net_1.Net.UnRegister(24649),
			Net_1.Net.UnRegister(13620),
			Net_1.Net.UnRegister(6737),
			Net_1.Net.UnRegister(11508),
			Net_1.Net.UnRegister(5744),
			Net_1.Net.UnRegister(2719),
			Net_1.Net.UnRegister(6271),
			Net_1.Net.UnRegister(16317),
			Net_1.Net.UnRegister(4137),
			Net_1.Net.UnRegister(28949),
			Net_1.Net.UnRegister(9995),
			Net_1.Net.UnRegister(25911),
			Net_1.Net.UnRegister(22332),
			Net_1.Net.UnRegister(10380),
			Net_1.Net.UnRegister(6817);
	}
	static cAe(e) {
		var t,
			o = MathUtils_1.MathUtils.LongToNumber(e.rkn);
		o =
			ModelManager_1.ModelManager.CreatureModel.GetEntity(
				o,
			)?.Entity?.GetComponent(140);
		o
			? ((t = MathUtils_1.MathUtils.LongToNumber(e.hIs)),
				o.SetControllerId(t),
				e.lIs && o.ResetItemLocationAndRotation())
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Level",
					32,
					"[ControllerIdModifyNotify] 找不到Entity对应的SceneItemManipulatableComponent",
				);
	}
	static iBn(e) {
		var t = MathUtils_1.MathUtils.LongToNumber(e.rkn),
			o =
				((t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)),
				t?.Entity?.GetComponent(140));
		if (o) {
			(e = MathUtils_1.MathUtils.LongToNumber(e.lMs)),
				o.SetAutonomousId(e),
				(o = t.Entity.GetComponent(182));
			let n = !1;
			0 !== e &&
				(n =
					(r = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()) === e);
			var r = t.Entity.GetComponent(142);
			0 !== e
				? r?.TryEnable()
				: r?.TryDisable("[ControllerIdModifyInternal] RoleEntityId === 0"),
				o.IsMoveAutonomousProxy && !n && r?.ForceSendPendingMoveInfos(),
				o.SetAutonomous(n);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Level",
					32,
					"[ControllerIdModifyNotify] 找不到Entity对应的SceneItemManipulatableComponent",
				);
	}
	static mAe(e) {
		var t = MathUtils_1.MathUtils.LongToNumber(e.aIs),
			o = MathUtils_1.MathUtils.LongToNumber(e.sIs),
			r =
				((e = e.cMs - 1),
				ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t));
		r?.Valid
			? EventSystem_1.EventSystem.EmitWithTarget(
					r.Entity,
					EventDefine_1.EEventName.OnManipulatableSceneItemPosInFoundation,
					o,
					e,
				)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Level",
					32,
					"RelationIdNotify下发的Id找不到对应的Entity",
					["EntityConfigId", t],
				);
	}
	static dAe(e) {
		var t = MathUtils_1.MathUtils.LongToNumber(e.rkn),
			o =
				((t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)),
				MathUtils_1.MathUtils.LongToNumber(e.hIs)),
			r =
				((o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o)),
				o?.Entity?.GetComponent(3));
		r &&
			!r.IsRoleAndCtrlByMe &&
			((r = o.Entity.GetComponent(55)),
			e.zkn ? r.ActiveHandFX(t.Entity) : r.DeactiveHandFx());
	}
	static CAe(e) {
		var t = MathUtils_1.MathUtils.LongToNumber(e.Zkn),
			o = (t =
				ModelManager_1.ModelManager.CreatureModel.GetEntity(
					t,
				)).Entity.GetComponent(121),
			r =
				((t = t.Entity.GetComponent(145).Config.Config.Type),
				MathUtils_1.MathUtils.LongToNumber(e.eFn)),
			n =
				((r =
					ModelManager_1.ModelManager.CreatureModel.GetEntity(
						r,
					).Entity.GetComponent(122)),
				new SceneItemJigsawBaseComponent_1.JigsawIndex(e.iFn.tFn, e.iFn.rFn));
		(r.Rotation = e.iFn.oFn),
			0 === e.nFn ? o.OnPickUpItem(r, t, !1) : o.OnPutDownItem(r, n, t, !1);
	}
	static gAe(e) {
		var t = MathUtils_1.MathUtils.LongToNumber(e.Zkn),
			o =
				((t =
					ModelManager_1.ModelManager.CreatureModel.GetEntity(
						t,
					).Entity.GetComponent(121)),
				MathUtils_1.MathUtils.LongToNumber(e.eFn)),
			r =
				((o =
					ModelManager_1.ModelManager.CreatureModel.GetEntity(
						o,
					).Entity.GetComponent(122)),
				new SceneItemJigsawBaseComponent_1.JigsawIndex(e.iFn.tFn, e.iFn.rFn));
		(o.Rotation = e.iFn.oFn),
			t.OnPickUpItem(o, IComponent_1.EItemFoundation.BuildingBlock, !1),
			t.OnPutDownItem(o, r, IComponent_1.EItemFoundation.BuildingBlock, !1);
	}
	static fAe(e) {
		(e = MathUtils_1.MathUtils.LongToNumber(e.sFn)),
			ModelManager_1.ModelManager.CreatureModel.GetEntity(e)
				.Entity.GetComponent(121)
				.OnFinish();
	}
	static pAe(e, t, o, r) {
		LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"LevelEvent",
				7,
				"执行EntityGroupAction，等待创建Entity",
				["CreatureDataId", t],
				["PlayerId", e.aFn],
				["SessionId", e.Ykn],
				["StartIndex", e.hFn],
				["EndIndex", e.Wms],
			),
			WaitEntityTask_1.WaitEntityTask.Create(
				t,
				(n) => {
					if (
						n &&
						(n = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))
					) {
						var a = n.Entity.GetComponent(0)?.GetPbEntityInitData();
						if (
							a &&
							(a = (0, IComponent_1.getComponent)(
								a.ComponentsData,
								"EntityGroupComponent",
							)) &&
							a?.StateTriggers?.length
						) {
							let l = a.StateTriggers[r]?.SuccessActions;
							(l = o ? l : a.StateTriggers[r]?.FailActions)?.length &&
								(LevelGeneralController_1.LevelGeneralController
									.LevelEventLogOpen &&
									Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"LevelEvent",
										7,
										"执行EntityGroupAction，Entity创建完毕",
										["CreatureDataId", t],
										["PlayerId", e.aFn],
										["SessionId", e.Ykn],
										["StartIndex", e.hFn],
										["EndIndex", e.Wms],
									),
								LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
									l,
									LevelGeneralContextDefine_1.EntityContext.Create(n.Id),
									e.aFn,
									e.Ykn,
									e.hFn,
									e.Wms,
								));
						}
					}
				},
				!1,
				exports.WAIT_ENTITY_ERROR_TIME,
				!0,
				!0,
			);
	}
	static RequestSceneItemStateChange(e, t) {
		var o = Protocol_1.Aki.Protocol.C_s.create();
		(o.rkn = MathUtils_1.MathUtils.NumberToLong(
			ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
		)),
			(o.lFn = t),
			Net_1.Net.Call(22981, o, (e) => {});
	}
	static RequestActiveOrDeactiveManipulateFx(e, t) {
		var o = Protocol_1.Aki.Protocol.L1s.create();
		(o.rkn = MathUtils_1.MathUtils.NumberToLong(
			ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
		)),
			(o.zkn = t),
			Net_1.Net.Call(29392, o, (e) => {});
	}
	static RequestAwakePbEntity(e, t) {}
	static RequestSpawnPbEntity(e, t) {
		t(!0);
	}
	static RequestChangeEntityState(e, t) {
		var o = Protocol_1.Aki.Protocol.v1s.create();
		(o.rkn = e.EntityId),
			(o._Fn = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.State)),
			Net_1.Net.Call(17700, o, (t) => {
				t &&
					t.lkn === Protocol_1.Aki.Protocol.lkn.Sys &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Level",
						7,
						"[LevelGeneralController.RequestChangeEntityState] 请求实体状态改变成功",
						["PbDataId:", e.EntityId],
						["TargetState:", e.State],
					);
			});
	}
	static RequestEntitySendEvent(e, t) {
		var o = Protocol_1.Aki.Protocol.eJn.create();
		(o.rkn = e),
			(o.uFn = t),
			Net_1.Net.Call(26450, o, (o) => {
				o &&
					o.lkn === Protocol_1.Aki.Protocol.lkn.Sys &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Level",
						36,
						"[LevelGeneralController.EntitySendEventResponse] 请求实体监听事件成功",
						["entityId:", e],
						["enventKey:", t],
					);
			});
	}
	static RequestEntityChangeLock(e, t) {
		var o = Protocol_1.Aki.Protocol.nYn.create();
		(o.cFn = t),
			(o.rkn = e),
			Net_1.Net.Call(12769, o, (o) => {
				o &&
					o.lkn === Protocol_1.Aki.Protocol.lkn.Sys &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Level",
						7,
						"[LevelGeneralController.RequestEntityChangeLock] 请求实体解锁状态",
						["PbDataId:", e],
						["TargetState:", t],
					);
			});
	}
	static RequestDoAction(e, t) {}
	static RequestSetInitTagRequest(e) {
		var t;
		e &&
			(((t = Protocol_1.Aki.Protocol.N1s.create()).rkn =
				MathUtils_1.MathUtils.NumberToLong(e)),
			Net_1.Net.Call(28434, t, (e) => {}));
	}
	static RequestActionsFinish(e, t, o, r, n) {
		var a = Protocol_1.Aki.Protocol.d$n.create();
		(a.aFn = e),
			(a.Ykn = t),
			(a.hFn = o),
			(a.mFn = r),
			Net_1.Net.Call(13673, a, n);
	}
	static RequestEntityInteractOption(e, t, o, r) {
		var n = Protocol_1.Aki.Protocol.LYn.create();
		(n.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
			(n.dFn = t),
			r && (n.CFn = r),
			Net_1.Net.Call(15563, n, o);
	}
	static RequestEntityDynamicInteractOption(e, t, o) {
		var r = Protocol_1.Aki.Protocol.PYn.create();
		(r.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
			(r.gFn = t),
			Net_1.Net.Call(24392, r, o);
	}
	static RequestEntityRandomInteractOption(e, t, o) {
		var r = Protocol_1.Aki.Protocol.DYn.create();
		(r.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
			(r.dFn = t),
			Net_1.Net.Call(22687, r, o);
	}
	static IsEntityEnableAwake(e) {
		if (
			ModelManager_1.ModelManager.GameModeModel.IsMulti &&
			ModelManager_1.ModelManager.PlayerInfoModel.GetId() !==
				ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()
		)
			for (const t of e)
				ModelManager_1.ModelManager.CreatureModel.GetEntityData(t);
		return !0;
	}
	static CheckCurrentPlayerIsParticipator(e) {
		if (!e) return !1;
		let t = !1;
		switch (e.Type) {
			case 2:
				t = LevelGeneralNetworks.vAe(e.QuestId);
				break;
			case 3:
				t = LevelGeneralNetworks.MAe(e.LevelPlayId);
				break;
			case 4:
				t = LevelGeneralNetworks.SAe(e.InstanceDungeonId);
				break;
			case 6:
				t = LevelGeneralNetworks.EAe(e.BtType, e.TreeConfigId);
				break;
			case 1:
				t = !0;
		}
		return t;
	}
	static EAe(e, t) {
		let o = !1;
		switch (e) {
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest:
				o = LevelGeneralNetworks.vAe(t);
				break;
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay:
				o = LevelGeneralNetworks.MAe(t);
				break;
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInst:
				o = LevelGeneralNetworks.SAe(t);
		}
		return o;
	}
	static vAe(e) {
		if (!(e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e))) return !1;
		let t = !1;
		switch (e.OnlineType) {
			case "SingleHangUpOnline":
				t = !ModelManager_1.ModelManager.GameModeModel.IsMulti;
				break;
			case "SingleNotHangUpOnline":
				t = ModelManager_1.ModelManager.CreatureModel.IsMyWorld();
		}
		return t;
	}
	static MAe(e) {
		if (
			!(e =
				ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
					e,
				))
		)
			return !1;
		let t = !1;
		switch (e.OnlineType) {
			case "Local":
				t = !ModelManager_1.ModelManager.GameModeModel.IsMulti;
				break;
			case "SingleOnline":
				t = ModelManager_1.ModelManager.CreatureModel.IsMyWorld();
				break;
			case "Multiplayer":
				t = !0;
		}
		return t;
	}
	static SAe(e) {
		return (
			!!GameModeController_1.GameModeController.IsInInstance() &&
			ModelManager_1.ModelManager.CreatureModel.GetInstanceId() === e
		);
	}
	static RequestPlayerAccessEffectArea(e, t) {
		var o = Protocol_1.Aki.Protocol.Bds.create();
		(o.fFn = MathUtils_1.MathUtils.NumberToLong(
			ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
		)),
			(o.pFn = t
				? Protocol_1.Aki.Protocol.pFn.Proto_RangeEnter
				: Protocol_1.Aki.Protocol.pFn.Proto_RangeLeave),
			Net_1.Net.Call(13194, o, (e) => {});
	}
}
(exports.LevelGeneralNetworks = LevelGeneralNetworks),
	((_a = LevelGeneralNetworks).XUe = (e) => {
		WaitEntityTask_1.WaitEntityTask.Create(
			MathUtils_1.MathUtils.LongToNumber(e.rkn),
			(t) => {
				var o;
				t
					? (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
							MathUtils_1.MathUtils.LongToNumber(e.rkn),
						))?.Valid &&
						((o =
							LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(
								e.Hms,
							)),
						ModelManager_1.ModelManager.InteractionModel.AddInteractOption(
							t.Entity,
							e.gFn,
							o,
							e.nMs,
						))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Level",
							37,
							"[EntityAddDynamicInteractNotify] 等待实体创建时，实体被移除（可能因为加载失败）",
							["id", MathUtils_1.MathUtils.LongToBigInt(e.rkn)],
						);
			},
			!1,
			exports.WAIT_ENTITY_ERROR_TIME,
			!0,
			!0,
		);
	}),
	(LevelGeneralNetworks.$Ue = (e) => {
		WaitEntityTask_1.WaitEntityTask.Create(
			MathUtils_1.MathUtils.LongToNumber(e.rkn),
			(t) => {
				t
					? (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
							MathUtils_1.MathUtils.LongToNumber(e.rkn),
						)) &&
						ModelManager_1.ModelManager.InteractionModel.RemoveInteractOption(
							t.Entity,
							e.gFn,
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Level",
							37,
							"[EntityRemoveDynamicInteractNotify] 等待实体创建时，实体被移除（可能因为加载失败）",
							["id", MathUtils_1.MathUtils.LongToNumber(e.rkn)],
						);
			},
			!1,
			exports.WAIT_ENTITY_ERROR_TIME,
			!0,
			!0,
		);
	}),
	(LevelGeneralNetworks.YUe = (e) => {
		WaitEntityTask_1.WaitEntityTask.Create(
			MathUtils_1.MathUtils.LongToNumber(e.rkn),
			(t) => {
				t
					? (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
							MathUtils_1.MathUtils.LongToNumber(e.rkn),
						)) &&
						ModelManager_1.ModelManager.InteractionModel.ChangeOptionText(
							t.Entity,
							e.gFn,
							e.nMs,
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Level",
							37,
							"[OnEntityChangeDynamicInteractTextNotify] 等待实体创建时，实体被移除（可能因为加载失败）",
							["id", MathUtils_1.MathUtils.LongToNumber(e.rkn)],
						);
			},
			!1,
			exports.WAIT_ENTITY_ERROR_TIME,
			!0,
			!0,
		);
	}),
	(LevelGeneralNetworks.JUe = (e) => {
		WaitEntityTask_1.WaitEntityTask.Create(
			MathUtils_1.MathUtils.LongToNumber(e.rkn),
			(t) => {
				t
					? (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
							MathUtils_1.MathUtils.LongToNumber(e.rkn),
						))?.Valid &&
						ModelManager_1.ModelManager.InteractionModel.LockInteraction(
							t.Entity,
							e.KMs,
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Level",
							37,
							"[EntityInteractFinishNotify] 等待实体创建时，实体被移除（可能因为加载失败）",
							["id", MathUtils_1.MathUtils.LongToBigInt(e.rkn)],
						);
			},
			!1,
			exports.WAIT_ENTITY_ERROR_TIME,
			!0,
			!0,
		);
	}),
	(LevelGeneralNetworks.zUe = (e) => {
		var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
			MathUtils_1.MathUtils.LongToNumber(e.rkn),
		);
		t && t.Entity.GetComponent(117)?.UpdateState(e.Ukn, e.WMs);
	}),
	(LevelGeneralNetworks.ZUe = (e) => {
		var t = MathUtils_1.MathUtils.LongToNumber(e.rkn),
			o = MathUtils_1.MathUtils.LongToNumber(e.hIs);
		const r = new Array();
		r.push(t),
			0 !== o && r.push(o),
			WaitEntityTask_1.WaitEntityTask.Create(r, (t) => {
				t
					? LevelGeneralNetworks.cAe(e)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Level",
							32,
							"[ControllerIdModifyNotify] 等待之后还是找不到对应的Entity",
							["ids", r],
						);
			});
	}),
	(LevelGeneralNetworks.tBn = (e) => {
		var t = MathUtils_1.MathUtils.LongToNumber(e.rkn),
			o = MathUtils_1.MathUtils.LongToNumber(e.lMs);
		const r = new Array();
		r.push(t),
			0 !== o && r.push(o),
			WaitEntityTask_1.WaitEntityTask.Create(r, (t) => {
				t
					? LevelGeneralNetworks.iBn(e)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Level",
							32,
							"[ControllerIdModifyNotify] 等待之后还是找不到对应的Entity",
							["ids", r],
						);
			});
	}),
	(LevelGeneralNetworks.eAe = (e) => {
		if (ModelManager_1.ModelManager.CreatureModel.GetInstanceId() === e.vFn) {
			const t = new Array();
			t.push(MathUtils_1.MathUtils.LongToNumber(e.aIs)),
				0 !== e.sIs && t.push(MathUtils_1.MathUtils.LongToNumber(e.sIs)),
				WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(t, (o) => {
					o
						? LevelGeneralNetworks.mAe(e)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Level",
								32,
								"[RelationIdModifyNotif] 等待之后还是找不到对应的Entity",
								["ids", t],
							);
				});
		}
	}),
	(LevelGeneralNetworks.tAe = (e) => {
		var t = MathUtils_1.MathUtils.LongToNumber(e.rkn),
			o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
		if (o?.Valid) {
			var r = o?.Entity?.GetComponent(110);
			if (r) {
				var n = new SceneItemDynamicAttachTargetComponent_1.AttachParam();
				switch (
					((n.PosAttachType = 2),
					(n.PosAttachOffset = e.MFn),
					(n.PosAbsolute = !1),
					(n.RotAttachType = 2),
					(n.RotAttachOffset = e.SFn),
					(n.RotAbsolute = !1),
					e.EFn)
				) {
					case Protocol_1.Aki.Protocol._Gs.Proto_AttachTargetEntity:
						r.IsRegTarget() &&
							r.UnRegTarget("[EntityAttachChangeNotify] AttachTargetEntity"),
							r.RegEntityTarget(
								e.IFn.yFn,
								e.IFn.TFn,
								n,
								"[EntityAttachChangeNotify] AttachTargetEntity",
							);
						break;
					case Protocol_1.Aki.Protocol._Gs.Proto_AttachTargetActorPath:
						r.IsRegTarget() &&
							r.UnRegTarget("[EntityAttachChangeNotify] AttachTargetActorPath"),
							r.RegRefActorTarget(
								e.LFn,
								n,
								"[EntityAttachChangeNotify] AttachTargetActorPath",
							);
						break;
					case Protocol_1.Aki.Protocol._Gs.Proto_AttachTargetNone:
						r.UnRegTarget("[EntityAttachChangeNotify] AttachTargetNone");
				}
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Level",
						40,
						"EntityAttachChangeNotify指定的Entity缺少DynamicAttachComp",
						["EntityConfigId", t],
					);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Level",
					40,
					"EntityAttachChangeNotify下发的EntityId找不到对应的Entity",
					["EntityConfigId", t],
				);
	}),
	(LevelGeneralNetworks.iAe = (e) => {
		var t = MathUtils_1.MathUtils.LongToNumber(e.rkn),
			o = MathUtils_1.MathUtils.LongToNumber(e.hIs);
		const r = new Array();
		r.push(t),
			r.push(o),
			WaitEntityTask_1.WaitEntityTask.Create(r, (t) => {
				t
					? LevelGeneralNetworks.dAe(e)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Level",
							32,
							"[FxShowNotify] 等待之后还是找不到对应的Entity",
							["ids", r],
						);
			});
	}),
	(LevelGeneralNetworks.oAe = (e) => {
		var t = MathUtils_1.MathUtils.LongToNumber(e.Zkn),
			o = MathUtils_1.MathUtils.LongToNumber(e.eFn);
		const r = new Array();
		r.push(t),
			r.push(o),
			WaitEntityTask_1.WaitEntityTask.Create(r, (t) => {
				t
					? LevelGeneralNetworks.CAe(e)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Level",
							32,
							"[OnPlaceItemOnBoardNotify] 等待之后还是找不到对应的Entity",
							["ids", r],
						);
			});
	}),
	(LevelGeneralNetworks.rAe = (e) => {
		var t = MathUtils_1.MathUtils.LongToNumber(e.Zkn),
			o = MathUtils_1.MathUtils.LongToNumber(e.eFn);
		const r = new Array();
		r.push(t),
			r.push(o),
			WaitEntityTask_1.WaitEntityTask.Create(r, (t) => {
				t
					? LevelGeneralNetworks.gAe(e)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Level",
							32,
							"[OnPlaceItemOnBoardNotify] 等待之后还是找不到对应的Entity",
							["ids", r],
						);
			});
	}),
	(LevelGeneralNetworks.nAe = (e) => {
		const t = MathUtils_1.MathUtils.LongToNumber(e.sFn);
		WaitEntityTask_1.WaitEntityTask.Create(t, (o) => {
			o
				? _a.fAe(e)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Level",
						32,
						"[OnPlaceItemOnBoardNotify] 等待之后还是找不到对应的Entity",
						["baseId", t],
					);
		});
	}),
	(LevelGeneralNetworks.QUe = (e) => {
		var t = e.Hms,
			o = e.Ykn;
		if (LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen) {
			let r = "";
			try {
				r = JSON.stringify(t);
			} catch {
				r = "Context序列化解析失败";
			}
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"LevelEvent",
					7,
					"服务端驱动执行行为组",
					["Context", r],
					["PlayerId", e.aFn],
					["SessionId", o],
					["Total", e.jms],
					["StartIndex", e.hFn],
					["EndIndex", e.Wms],
				);
		}
		switch (t.Xms) {
			case Protocol_1.Aki.Protocol.Pbs.Zms:
				LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("LevelEvent", 7, "服务端驱动执行行为组（动态交互）"),
					TsInteractionUtils_1.TsInteractionUtils.HandleEntityDynamicInteractByServerNotify(
						e,
						t.Zms.gFn,
					);
				break;
			case Protocol_1.Aki.Protocol.Pbs.aCs:
				var r = t.aCs.VCs;
				(n =
					ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
						r,
					))
					? (a = n.LevelPlayOpenAction) &&
						0 !== a.length &&
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("SceneGameplay", 19, "开始执行玩法开启/刷新动作"),
						LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
							a,
							LevelGeneralContextDefine_1.LevelPlayContext.Create(n.Id),
							e.aFn,
							e.Ykn,
							e.hFn,
							e.Wms,
						))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GeneralLogicTree",
							19,
							"服务器通知玩法执行行为时：对应的玩法不存在，联系程序检查Bug",
							[
								"treeType",
								GeneralLogicTreeDefine_1.btTypeLogString[
									Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay
								],
							],
							["treeId", r],
						);
				break;
			case Protocol_1.Aki.Protocol.Pbs.hCs:
				var n,
					a = t.hCs.VCs;
				(n =
					ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
						a,
					))
					? (r = n.AfterGetRewardAction) &&
						0 !== r.length &&
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("SceneGameplay", 19, "开始执行玩法开启/刷新动作"),
						LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
							r,
							LevelGeneralContextDefine_1.LevelPlayContext.Create(n.Id),
							e.aFn,
							e.Ykn,
							e.hFn,
							e.Wms,
						))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GeneralLogicTree",
							19,
							"服务器通知玩法执行行为时：对应的玩法不存在，联系程序检查Bug",
							[
								"treeType",
								GeneralLogicTreeDefine_1.btTypeLogString[
									Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay
								],
							],
							["treeId", a],
						);
				break;
			case Protocol_1.Aki.Protocol.Pbs.lCs:
				if (
					((r = t.lCs.Xkn),
					!(n = ModelManager_1.ModelManager.QuestNewModel.GetQuest(r)))
				)
					return void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GeneralLogicTree",
							19,
							"服务器通知任务执行行为时：对应的任务不存在，联系程序检查Bug",
							[
								"treeType",
								GeneralLogicTreeDefine_1.btTypeLogString[
									Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest
								],
							],
							["treeId", r],
						)
					);
				(a = n.ActiveActions) &&
					0 !== a.length &&
					LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
						a,
						LevelGeneralContextDefine_1.QuestContext.Create(r),
						e.aFn,
						e.Ykn,
						e.hFn,
						e.Wms,
					);
				break;
			case Protocol_1.Aki.Protocol.Pbs._Cs:
				if (
					((n = t._Cs.Xkn),
					!(a = ModelManager_1.ModelManager.QuestNewModel.GetQuest(n)))
				)
					return void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GeneralLogicTree",
							19,
							"服务器通知任务执行行为时：对应的任务不存在，联系程序检查Bug",
							[
								"treeType",
								GeneralLogicTreeDefine_1.btTypeLogString[
									Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest
								],
							],
							["treeId", n],
						)
					);
				(r = a.AcceptActions) &&
					0 !== r.length &&
					LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
						r,
						LevelGeneralContextDefine_1.QuestContext.Create(n),
						e.aFn,
						e.Ykn,
						e.hFn,
						e.Wms,
					);
				break;
			case Protocol_1.Aki.Protocol.Pbs.uCs:
				if (
					((a = t.uCs.Xkn),
					!(r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(a)))
				)
					return void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GeneralLogicTree",
							19,
							"服务器通知任务执行行为时：对应的任务不存在，联系程序检查Bug",
							[
								"treeType",
								GeneralLogicTreeDefine_1.btTypeLogString[
									Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest
								],
							],
							["treeId", a],
						)
					);
				(n = r.FinishActions) &&
					0 !== n.length &&
					LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
						n,
						LevelGeneralContextDefine_1.QuestContext.Create(a),
						e.aFn,
						e.Ykn,
						e.hFn,
						e.Wms,
					);
				break;
			case Protocol_1.Aki.Protocol.Pbs.DCs:
				if (
					((r = t.DCs.Xkn),
					!(n = ModelManager_1.ModelManager.QuestNewModel.GetQuest(r)))
				)
					return void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GeneralLogicTree",
							19,
							"服务器通知任务执行行为时：对应的任务不存在，联系程序检查Bug",
							[
								"treeType",
								GeneralLogicTreeDefine_1.btTypeLogString[
									Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest
								],
							],
							["treeId", r],
						)
					);
				(a = n.TerminateActions) &&
					0 !== a.length &&
					LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
						a,
						LevelGeneralContextDefine_1.QuestContext.Create(r),
						e.aFn,
						e.Ykn,
						e.hFn,
						e.Wms,
					);
				break;
			case Protocol_1.Aki.Protocol.Pbs.cCs:
			case Protocol_1.Aki.Protocol.Pbs.dCs:
			case Protocol_1.Aki.Protocol.Pbs.mCs:
			case Protocol_1.Aki.Protocol.Pbs.CCs:
			case Protocol_1.Aki.Protocol.Pbs.gCs:
			case Protocol_1.Aki.Protocol.Pbs.SCs:
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.BehaviorTreeStartActionSession,
					e,
				);
				break;
			case Protocol_1.Aki.Protocol.Pbs.zms:
				(n = MathUtils_1.MathUtils.LongToNumber(t.zms.wCs.Ykn)),
					LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"LevelEvent",
							7,
							"服务端驱动执行行为组（EntityInteractAction）",
							["CreatureDataId", n],
						),
					TsInteractionUtils_1.TsInteractionUtils.HandleEntityInteractByServerNotify(
						e,
						n,
						t.zms.dFn,
					);
				break;
			case Protocol_1.Aki.Protocol.Pbs.Proto_EntityStateChangeAction:
				(a = MathUtils_1.MathUtils.LongToNumber(t.tCs.wCs.Ykn)),
					LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"LevelEvent",
							7,
							"服务端驱动执行行为组（EntityStateChangeAction）",
							["CreatureDataId", a],
						),
					SceneItemUtility_1.SceneItemUtility.HandleSceneItemStateActionByServerNotify(
						e,
						a,
						t.tCs.xCs,
					);
				break;
			case Protocol_1.Aki.Protocol.Pbs.iCs:
				(r = MathUtils_1.MathUtils.LongToNumber(t.iCs.wCs.Ykn)),
					LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"LevelEvent",
							7,
							"服务端驱动执行行为组（EntityGroupAction）",
							["CreatureDataId", r],
						),
					LevelGeneralNetworks.pAe(e, r, t.iCs.DFn, t.iCs.bCs);
				break;
			case Protocol_1.Aki.Protocol.Pbs.rCs:
				(n = MathUtils_1.MathUtils.LongToNumber(t.rCs.wCs.Ykn)),
					(a = MathUtils_1.MathUtils.LongToNumber(t.rCs.BCs)),
					LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"LevelEvent",
							7,
							"服务端驱动执行行为组（EntityTriggerAction）",
							["CreatureDataId", n],
						),
					SceneItemUtility_1.SceneItemUtility.HandleTriggerStateActionByServerNotify(
						e,
						n,
						a,
					);
				break;
			case Protocol_1.Aki.Protocol.Pbs.Proto_EntityLeaveTrigger:
				(r = MathUtils_1.MathUtils.LongToNumber(t.oCs.wCs.Ykn)),
					(n = MathUtils_1.MathUtils.LongToNumber(t.oCs.BCs)),
					LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"LevelEvent",
							7,
							"服务端驱动执行行为组（EntityLeaveTriggerAction）",
							["CreatureDataId", r],
						),
					SceneItemUtility_1.SceneItemUtility.HandleExitTriggerStateActionByServerNotify(
						e,
						r,
						n,
					);
				break;
			case Protocol_1.Aki.Protocol.Pbs.ECs:
				(a = MathUtils_1.MathUtils.LongToNumber(t.ECs.wCs.Ykn)),
					SceneItemUtility_1.SceneItemUtility.HandleExploreInteractActionByServerNotify(
						e,
						a,
					);
				break;
			case Protocol_1.Aki.Protocol.Pbs.nCs:
				(r = MathUtils_1.MathUtils.LongToNumber(t.nCs.wCs.Ykn)),
					SceneItemUtility_1.SceneItemUtility.HandleSceneItemDestructibleActionByServerNotify(
						e,
						r,
					);
				break;
			case Protocol_1.Aki.Protocol.Pbs.sCs:
				(n = MathUtils_1.MathUtils.LongToNumber(t.sCs.wCs.Ykn)),
					SceneItemUtility_1.SceneItemUtility.HandleTimeTrackControlActionByServerNotify(
						e,
						n,
						t.sCs,
					);
				break;
			case Protocol_1.Aki.Protocol.Pbs.Proto_SceneItemLifeCycleComponentCreate:
				(a = MathUtils_1.MathUtils.LongToNumber(t.TCs.wCs.Ykn)),
					LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"LevelEvent",
							7,
							"服务端驱动执行行为组（LifeCycleCreateAction）",
							["CreatureDataId", a],
						),
					SceneItemUtility_1.SceneItemUtility.HandleLifeCycleStageActionByServerNotify(
						e,
						a,
						!0,
					);
				break;
			case Protocol_1.Aki.Protocol.Pbs.Proto_SceneItemLifeCycleComponentDetroy:
				(r = MathUtils_1.MathUtils.LongToNumber(t.LCs.wCs.Ykn)),
					LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"LevelEvent",
							7,
							"服务端驱动执行行为组（LifeCycleDestroyAction）",
							["CreatureDataId", r],
						),
					SceneItemUtility_1.SceneItemUtility.HandleLifeCycleStageActionByServerNotify(
						e,
						r,
						!1,
					);
				break;
			case Protocol_1.Aki.Protocol.Pbs.ACs:
				(n = MathUtils_1.MathUtils.LongToNumber(t.ACs.wCs.Ykn)),
					(a = t.ACs.AFn),
					LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"LevelEvent",
							40,
							"服务端驱动执行行为组（EntityBeamReceiveAction）",
							["CreatureDataId", n],
							["ReceiveType", a],
						),
					SceneItemUtility_1.SceneItemUtility.HandleBeamReceiveActionByServerNotify(
						e,
						n,
						a,
					);
				break;
			case Protocol_1.Aki.Protocol.Pbs.ICs: {
				let o;
				r = t.ICs.UFn;
				try {
					o = JSON.parse(r);
				} catch {
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Gm", 40, "GM驱动行为列表: 行为列表解析失败", [
							"JsonStr",
							r,
						]);
					break;
				}
				if (!Array.isArray(o) || 0 === o.length) break;
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Gm", 40, "开始执行GM驱动行为列表"),
					LevelGeneralController_1.LevelGeneralController.ExecuteActionsByServerNotify(
						o,
						LevelGeneralContextDefine_1.GmLevelActionContext.Create(),
						e.aFn,
						e.Ykn,
						e.hFn,
						e.Wms,
					);
				break;
			}
			case Protocol_1.Aki.Protocol.Pbs.Proto_EntityStateChangeConditionAction:
				(n = MathUtils_1.MathUtils.LongToNumber(t.UCs.wCs.Ykn)),
					LevelGeneralController_1.LevelGeneralController.LevelEventLogOpen &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"LevelEvent",
							7,
							"服务端驱动执行行为组（EntityStateChangeConditionAction）",
							["CreatureDataId", n],
						),
					SceneItemUtility_1.SceneItemUtility.HandleSceneItemStateChangeConditionActionByServerNotify(
						e,
						n,
						t.UCs.xCs,
						t.UCs.fkn,
					);
		}
	}),
	(LevelGeneralNetworks.sAe = (e) => {
		const t = MathUtils_1.MathUtils.LongToNumber(e.sFn);
		WaitEntityTask_1.WaitEntityTask.Create(t, (o) => {
			if (o && (o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))) {
				var r = o.Entity.GetComponent(121);
				if (r)
					for (const t of e.BSs) {
						var n = new SceneItemJigsawBaseComponent_1.JigsawIndex(
								t.LSs,
								t.RSs,
							),
							a = MathUtils_1.MathUtils.LongToNumber(t.DSs);
						r.DynamicModifySocketState(n, a);
					}
			}
		});
	}),
	(LevelGeneralNetworks.aAe = (e) => {
		for (const t of e.yvs)
			10015 === t.RFn &&
				WorldMapController_1.WorldMapController.LockView(t.zCs);
	}),
	(LevelGeneralNetworks.hAe = (e) => {
		e.Qms
			? LevelGamePlayUtils_1.LevelGamePlayUtils.ReleaseOperationRestriction()
			: e.xFn &&
				LevelGamePlayUtils_1.LevelGamePlayUtils.LevelOperationRestriction(
					e.xFn,
				);
	}),
	(LevelGeneralNetworks.lAe = (e) => {
		const t = MathUtils_1.MathUtils.LongToNumber(e.HUs),
			o = e.pFn === Protocol_1.Aki.Protocol.pFn.Proto_RangeEnter,
			r = [];
		for (const t of e.W5s) r.push(MathUtils_1.MathUtils.LongToNumber(t));
		WaitEntityTask_1.WaitEntityTask.Create(t, (e) => {
			e &&
				(e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid &&
				(e = e.Entity.GetComponent(74)) &&
				e.ServerUpdateEntitiesInRangeOnline(o, r);
		});
	}),
	(LevelGeneralNetworks._Ae = (e) => {
		const t = MathUtils_1.MathUtils.LongToNumber(e.HUs),
			o = e.pFn === Protocol_1.Aki.Protocol.pFn.Proto_RangeEnter,
			r = e.jUs;
		WaitEntityTask_1.WaitEntityTask.Create(t, (e) => {
			e &&
				(e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid &&
				(e = e.Entity.GetComponent(74)) &&
				e.ServerUpdatePlayerInRangeOnline(o, r);
		});
	}),
	(LevelGeneralNetworks.uAe = (e) => {
		const t = MathUtils_1.MathUtils.LongToNumber(e.WUs),
			o = e.KUs === Protocol_1.Aki.Protocol.KUs.Proto_Up;
		WaitEntityTask_1.WaitEntityTask.Create(t, (e) => {
			e &&
				(e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid &&
				(e = e.Entity.GetComponent(136)) &&
				e.ChangeTransition(o);
		});
	}),
	(LevelGeneralNetworks.WTn = (e) => {
		var t;
		e.Evs &&
			((t = MathUtils_1.MathUtils.LongToNumber(e.rkn)),
			(t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t))) &&
			t.Entity?.GetComponent(0)?.UpdateVar(e.Svs, e.Evs);
	});
