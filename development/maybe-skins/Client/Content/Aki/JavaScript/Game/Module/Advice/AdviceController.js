"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceController = exports.INFO_ADVICE_ITEM_TYPE = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiManager_1 = require("../../Ui/UiManager"),
	LogReportController_1 = require("../LogReport/LogReportController"),
	LogReportDefine_1 = require("../LogReport/LogReportDefine"),
	AdviceData_1 = require("./AdviceData"),
	PROFILE_KEY = ((exports.INFO_ADVICE_ITEM_TYPE = 20), "Advice");
class AdviceController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return this.OnAddEvents(), this.OnRegisterNetEvent(), !0;
	}
	static OnClear() {
		return this.OnRemoveEvents(), this.OnUnRegisterNetEvent(), !0;
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnGetFriendInitData,
			AdviceController.RequestAdviceData,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnItemUse,
				this.k6e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OriginWorldLevelUp,
				AdviceController.F6e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPlayerLevelChanged,
				this.Cke,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnGetFriendInitData,
			AdviceController.RequestAdviceData,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnItemUse,
				this.k6e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OriginWorldLevelUp,
				AdviceController.F6e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPlayerLevelChanged,
				this.Cke,
			);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(19692, AdviceController.V6e),
			Net_1.Net.Register(14456, AdviceController.H6e),
			Net_1.Net.Register(3560, AdviceController.j6e),
			Net_1.Net.Register(17909, AdviceController.W6e);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(19692),
			Net_1.Net.UnRegister(14456),
			Net_1.Net.UnRegister(17909),
			Net_1.Net.UnRegister(3560);
	}
	static OpenAdviceConjunctionSelectView() {
		var e = ModelManager_1.ModelManager.AdviceModel;
		(e.CurrentChangeWordType = 1),
			(e.CurrentSelectWordId = e.CurrentConjunctionId),
			UiManager_1.UiManager.OpenView("AdviceWordView");
	}
	static OpenAdviceWordSelectView(e) {
		var t,
			r = ModelManager_1.ModelManager.AdviceModel,
			o = r.CurrentWordMap.get(e);
		void 0 !== o && 0 < o
			? ((t = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordType(o)),
				(r.CurrentSelectSortTypeId = t),
				(r.CurrentSelectSortWordId = o))
			: ((t =
					ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordTypeConfigs()[0]
						.Id),
				(r.CurrentSelectSortTypeId = t),
				(r.CurrentSelectSortWordId = -1)),
			(r.CurrentSelectWordIndex = e),
			UiManager_1.UiManager.OpenView("AdviceSortWordView");
	}
	static OpenAdviceSentenceSelectView() {
		if (0 === ModelManager_1.ModelManager.AdviceModel.CurrentLineModel) {
			const t = ModelManager_1.ModelManager.AdviceModel;
			t.CurrentChangeWordType = 0;
			var e = t.CurrentSentenceWordMap.get(0);
			(t.CurrentSelectWordId = e),
				(t.CurrentPreSelectSentenceIndex = 0),
				UiManager_1.UiManager.OpenView("AdviceWordView");
		} else UiManager_1.UiManager.OpenView("AdviceMutiSentenceSelectView");
	}
	static OpenAdviceExpressionView() {
		UiManager_1.UiManager.OpenView("AdviceExpressionView");
	}
	static OpenAdviceCreateView() {
		var e;
		ModelManager_1.ModelManager.AdviceModel.GetCreateAdvicePreConditionState()
			? (ModelManager_1.ModelManager.AdviceModel.ResetWordData(),
				UiManager_1.UiManager.OpenView("AdviceCreateView"))
			: ((e =
					ModelManager_1.ModelManager.AdviceModel.GetCreatePreConditionFailText()),
				ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					e,
				));
	}
	static OpenAdviceView() {
		(ModelManager_1.ModelManager.AdviceModel.AdviceViewShowId = void 0),
			UiManager_1.UiManager.OpenView("AdviceView");
	}
	static async OpenAdviceInfoView(e) {
		if (AdviceController.K6e()) return !1;
		{
			ModelManager_1.ModelManager.AdviceModel.SetCurrentEntityId(e),
				this.Q6e(e);
			e = await UiManager_1.UiManager.OpenViewAsync("AdviceInfoView");
			var t =
					(EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RefreshAdviceInfoView,
					),
					ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData().GetAdviceData()),
				r =
					ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData(),
				o = new LogReportDefine_1.AdviceWatchLogData();
			t =
				((o.l_advice_id = t.GetAdviceBigId().toString()),
				t.GetAdviceContentData());
			const n = new Array();
			return (
				t.forEach((e) => {
					var t = new AdviceData_1.LogAdviceData();
					t.Phrase(e), n.push(t);
				}),
				(o.o_content = n),
				(o.i_creator_id = r.GetPlayerId()),
				(o.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
				(o.i_father_area_id =
					ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
				(t =
					Global_1.Global.BaseCharacter.CharacterActorComponent
						.ActorLocationProxy),
				(o.f_pos_x = t.X),
				(o.f_pos_y = t.Y),
				(o.f_pos_z = t.Z),
				(o.i_expression =
					ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
				(o.i_motion = ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
				LogReportController_1.LogReportController.LogReport(o),
				void 0 !== e
			);
		}
	}
	static K6e() {
		var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		return (
			!(!e?.Valid || !e.Entity.GetComponent(185).HasTag(1996802261)) &&
			(ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
				"BattleCannotOpenAdvice",
			),
			!0)
		);
	}
	static Q6e(e) {
		var t = EntitySystem_1.EntitySystem.Get(e);
		0 < t.GetComponent(0).GetAdviceInfo().GetAdviceData().GetAdviceMotionId() &&
			ModelManager_1.ModelManager.AdviceModel.GetAdviceMotionActor(
				e,
			).PlayMotion(e),
			t.GetComponent(127)?.DoInteract();
	}
	static RequestCreateAdvice(e, t, r, o) {
		const n = new Protocol_1.Aki.Protocol.kjn();
		(n.M3n = { X: e.X, Y: e.Y, Z: e.Z }),
			(n.S3n = { Pitch: t.Pitch, Yaw: t.Yaw, Roll: t.Roll }),
			(n.E3n = new Array()),
			r.forEach((e) => {
				n.E3n.push(e.ConvertToPb());
			}),
			Net_1.Net.Call(7233, n, (e) => {
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							19506,
						)
					: (o && o(),
						ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"HasPublishAdvice",
						),
						ModelManager_1.ModelManager.AdviceModel.PhraseAdviceCreateData(e));
			});
	}
	static RequestModifyAdvice(e, t) {
		const r = new Protocol_1.Aki.Protocol.Fjn();
		(r.Ekn = e),
			(r.E3n = new Array()),
			t.forEach((e) => {
				r.E3n.push(e.ConvertToPb());
			}),
			Net_1.Net.Call(6623, r, (r) => {
				r.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							r.lkn,
							1471,
						)
					: ModelManager_1.ModelManager.AdviceModel.OnModifyAdvice(e, t);
			});
	}
	static RequestDeleteAdvice(e) {
		var t = new Protocol_1.Aki.Protocol.$jn();
		(t.Ekn = e),
			Net_1.Net.Call(8923, t, (t) => {
				t.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							t.lkn,
							4695,
						)
					: ModelManager_1.ModelManager.AdviceModel.OnDeleteAdvice(e);
			});
	}
	static RequestVote(e, t, r) {
		var o = new Protocol_1.Aki.Protocol.jjn();
		(o.Ekn = e),
			(o.Ikn = r),
			Net_1.Net.Call(4749, o, (e) => {
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							22770,
						),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnAdviceVoteNotify,
						))
					: ModelManager_1.ModelManager.AdviceModel.OnRequestVote(t, r);
			});
	}
	static RequestSetAdviceShowState(e) {
		const t = new Protocol_1.Aki.Protocol.wjn();
		(t.zkn = e),
			Net_1.Net.Call(10091, t, (e) => {
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							12012,
						)
					: ModelManager_1.ModelManager.AdviceModel.SetAdviceShowSetting(t.zkn);
			});
	}
	static CheckInInValidArea() {
		return !!ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceCannotPutArea().includes(
			ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId,
		);
	}
	static CheckBehindAdviceActor() {
		var e = ModelManager_1.ModelManager.CreatureModel.GetAllEntities(),
			t = ModelManager_1.ModelManager.FunctionModel.PlayerId,
			r =
				ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceCannotPutDistance();
		for (const a of e.values()) {
			if (
				(o = a.Entity.GetComponent(0)) &&
				o.GetAdviceInfo()?.GetPlayerId() === t
			) {
				var o = Global_1.Global.BaseCharacter,
					n = a.Entity.GetComponent(1)?.Owner;
				if (
					o &&
					a &&
					n &&
					((n = n.K2_GetActorLocation()),
					(o = o.K2_GetActorLocation()),
					UE.KismetMathLibrary.Vector_Distance(n, o) <= r)
				)
					return !0;
			}
		}
		return !1;
	}
	static CheckIfStandAndInValidActor() {
		var e = Vector_1.Vector.Create(),
			t = Vector_1.Vector.Create(),
			r = Global_1.Global.BaseCharacter.CharacterActorComponent,
			o = r.ActorLocationProxy,
			n =
				(e.DeepCopy(o),
				(e.Z += r.DefaultHalfHeight),
				t.DeepCopy(o),
				(t.Z -= r.DefaultHalfHeight + 300),
				ModelManager_1.ModelManager.TraceElementModel.GetActorTrace());
		if (
			!(o =
				((n.WorldContextObject = r.Actor),
				(n.Radius = r.DefaultRadius),
				TraceElementCommon_1.TraceElementCommon.SetStartLocation(n, e),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, t),
				n.ActorsToIgnore.Empty(),
				TraceElementCommon_1.TraceElementCommon.ShapeTrace(
					r.Actor.CapsuleComponent,
					n,
					PROFILE_KEY,
					PROFILE_KEY,
				)))
		)
			return (
				ModelManager_1.ModelManager.TraceElementModel.ClearActorTrace(), !1
			);
		var a = n.HitResult.GetHitCount();
		for (let e = 0; e < a; ++e) {
			var i = n.HitResult.Actors.Get(e);
			if (!this.X6e(i))
				return (
					ModelManager_1.ModelManager.TraceElementModel.ClearActorTrace(), !1
				);
		}
		return ModelManager_1.ModelManager.TraceElementModel.ClearActorTrace(), !0;
	}
	static X6e(e) {
		if (
			e &&
			UE.KuroStaticLibrary.IsImplementInterface(
				e.GetClass(),
				UE.BPI_CreatureInterface_C.StaticClass(),
			)
		) {
			var t = e.GetEntityId();
			const r = EntitySystem_1.EntitySystem.Get(t);
			return !r?.Valid;
		}
		const r =
			ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(e);
		return !r?.Valid;
	}
}
((exports.AdviceController = AdviceController).F6e = () => {
	UiManager_1.UiManager.IsViewShow("AdviceInfoView") &&
		UiManager_1.UiManager.CloseView("AdviceInfoView");
}),
	(AdviceController.Cke = (e, t, r, o, n, a, i) => {
		UiManager_1.UiManager.IsViewShow("AdviceInfoView") &&
			UiManager_1.UiManager.CloseView("AdviceInfoView");
	}),
	(AdviceController.k6e = (e, t) => {
		0 <
			(e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e))
				.Parameters.size &&
			void 0 !== (e = e.Parameters.get(exports.INFO_ADVICE_ITEM_TYPE)) &&
			0 !== e &&
			AdviceController.OpenAdviceCreateView();
	}),
	(AdviceController.RequestAdviceData = () => {
		var e = new Protocol_1.Aki.Protocol.qjn();
		Net_1.Net.Call(2962, e, (e) => {
			e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
				? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						28578,
					)
				: ModelManager_1.ModelManager.AdviceModel.PhraseAdviceData(e);
		});
	}),
	(AdviceController.V6e = (e) => {
		var t = MathUtils_1.MathUtils.LongToBigInt(e.Ekn);
		t = Number(t);
		(t = EntitySystem_1.EntitySystem.Get(t)) &&
			t.GetComponent(0).GetAdviceInfo().PhraseContent(e.E3n);
	}),
	(AdviceController.H6e = (e) => {
		var t = MathUtils_1.MathUtils.LongToNumber(e.Ekn);
		t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
		t?.Valid &&
			((t = t.Entity.GetComponent(0)).GetAdviceInfo().PhraseVote(e.Tgs),
			ModelManager_1.ModelManager.AdviceModel.OnAdviceVoteUpdate(
				t.GetAdviceInfo().GetAdviceData().GetAdviceBigId(),
				e,
			));
	}),
	(AdviceController.j6e = (e) => {
		ModelManager_1.ModelManager.AdviceModel.OnAdviceUpdateNotify(e);
	}),
	(AdviceController.W6e = (e) => {
		ModelManager_1.ModelManager.AdviceModel.SetAdviceShowSetting(e.zkn);
	});
