"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceInfoView = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	Global_1 = require("../../../Global"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiConfig_1 = require("../../../Ui/Define/UiConfig"),
	UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
	AdviceController_1 = require("../AdviceController"),
	CHECKTIMEGAP = 500,
	ROLEMOVERAGE = 3;
class AdviceInfoView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.IRe = void 0),
			(this.S8e = void 0),
			(this.o9e = void 0),
			(this.r9e = !1),
			(this.i7e = void 0),
			(this.o7e = () => {
				this.y9e();
			}),
			(this.n9e = (e, t) => {
				(this.r9e = t) && this.CloseMe();
			}),
			(this.r7e = () => !0),
			(this.n7e = () => {
				var e = ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityId(),
					t =
						((e = EntitySystem_1.EntitySystem.Get(e)
							?.GetComponent(0)
							.GetCreatureDataId()),
						ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData()
							.GetAdviceData()
							.GetAdviceBigId());
				ModelManager_1.ModelManager.AdviceModel.GetUpVoteIds().includes(t) &&
					((e = MathUtils_1.MathUtils.NumberToLong(e)),
					this.GetExtendToggle(6).SetToggleStateForce(0, !1),
					AdviceController_1.AdviceController.RequestVote(
						e,
						t,
						Protocol_1.Aki.Protocol.$Bs.Proto_Cancel,
					));
			}),
			(this.s7e = () => {
				var e = ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityId(),
					t =
						((e = EntitySystem_1.EntitySystem.Get(e)
							?.GetComponent(0)
							.GetCreatureDataId()),
						ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData()
							.GetAdviceData()
							.GetAdviceBigId());
				e = MathUtils_1.MathUtils.NumberToLong(e);
				this.GetExtendToggle(7).SetToggleStateForce(0, !1),
					ModelManager_1.ModelManager.AdviceModel.GetUpVoteIds().includes(t)
						? AdviceController_1.AdviceController.RequestVote(
								e,
								t,
								Protocol_1.Aki.Protocol.$Bs.Proto_Cancel,
							)
						: AdviceController_1.AdviceController.RequestVote(
								e,
								t,
								Protocol_1.Aki.Protocol.$Bs.Proto_Up,
							);
			}),
			(this.a7e = () => {
				this.h7e();
			}),
			(this.l7e = () => {
				this._7e(), this.u7e();
			}),
			(this.c7e = () => {
				this.m7e(), this.d7e(), this.C7e();
			}),
			(this.g7e = (e) => {
				UiConfig_1.UiConfig.TryGetViewInfo(e.Info.Name).Type ===
					UiLayerType_1.ELayerType.Normal && this.CloseMe();
			}),
			(this.f7e = () => {
				this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIVerticalLayout],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIExtendToggle],
			[7, UE.UIExtendToggle],
			[8, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[6, this.n7e],
				[7, this.s7e],
			]);
	}
	OnStart() {
		(this.IRe = void 0), this.GetExtendToggle(6).SetToggleGroup(void 0);
		var e = this.GetExtendToggle(7);
		e.CanExecuteChange.Unbind(),
			e.CanExecuteChange.Bind(this.r7e),
			e.SetToggleGroup(void 0),
			this.GetText(8).SetUIActive(!1),
			this.y9e();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnAdviceEntityNotify,
			this.l7e,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAdviceVoteNotify,
				this.l7e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CreateViewInstance,
				this.g7e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.UiSceneStartLoad,
				this.f7e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.o7e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RefreshAdviceInfoView,
				this.a7e,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnChangeRole,
			this.o7e,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAdviceEntityNotify,
				this.l7e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAdviceVoteNotify,
				this.l7e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CreateViewInstance,
				this.g7e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.UiSceneStartLoad,
				this.f7e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RefreshAdviceInfoView,
				this.a7e,
			);
	}
	y9e() {
		var e,
			t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		t.Valid &&
			((e = t.Entity.GetComponent(185)),
			(this.r9e = e.HasTag(1996802261)),
			this.I9e(),
			this.r9e ? this.CloseMe() : this.T9e(t));
	}
	T9e(e) {
		(e = e.Entity.GetComponent(185)),
			(this.o9e = e.ListenForTagAddOrRemove(1996802261, this.n9e));
	}
	I9e() {
		this.o9e?.EndTask(), (this.o9e = void 0);
	}
	_7e() {
		var e = ModelManager_1.ModelManager.AdviceModel.GetUpVoteIds(),
			t = ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData()
				.GetAdviceData()
				.GetAdviceBigId();
		e.includes(t)
			? this.GetExtendToggle(7).SetToggleStateForce(1, !1)
			: this.GetExtendToggle(7).SetToggleStateForce(0, !1);
	}
	OnAfterShow() {
		this.h7e();
	}
	h7e() {
		this.CFe(),
			(this.i7e = void 0),
			ModelManager_1.ModelManager.InteractionModel.SetInteractionHintDisable(
				!0,
			),
			(this.S8e =
				ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData().GetAdviceData()),
			this.Og();
	}
	CFe() {
		this.p7e(),
			void 0 === this.IRe &&
				(this.IRe = TimerSystem_1.TimerSystem.Forever(this.c7e, 500));
	}
	p7e() {
		void 0 !== this.IRe &&
			(TimerSystem_1.TimerSystem.Remove(this.IRe), (this.IRe = void 0));
	}
	m7e() {
		var e;
		this.i7e ||
			((e = Vector_1.Vector.Create()).DeepCopy(
				Global_1.Global.BaseCharacter.CharacterActorComponent
					.ActorLocationProxy,
			),
			(this.i7e = e));
	}
	Og() {
		this.u7e(), this.hke(), this.v7e(), this._7e(), this.x9e();
	}
	u7e() {
		var e = this.S8e.GetVote();
		this.GetText(5).SetText(e.toString()),
			(e =
				e >= ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceHighNum()
					? "F9D751"
					: "FFFFFF"),
			(e = UE.Color.FromHex(e));
		this.GetText(5).SetColor(e);
	}
	hke() {
		var e = this.S8e.GetAdviceShowText();
		this.GetText(4).SetText(e);
	}
	x9e() {
		var e =
			ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData().GetPlayerName();
		this.GetText(2).SetText(e);
	}
	v7e() {
		var e;
		0 < this.S8e.GetAdviceExpressionId()
			? (this.GetTexture(1).SetUIActive(!0),
				(e = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(
					this.S8e.GetAdviceExpressionId(),
				)),
				this.SetTextureByPath(e.ExpressionTexturePath, this.GetTexture(1)))
			: this.GetTexture(1).SetUIActive(!1);
	}
	C7e() {
		var e;
		ModelManager_1.ModelManager.InteractionModel.IsHideInteractHint &&
			((e =
				Global_1.Global.BaseCharacter.CharacterActorComponent
					.ActorLocationProxy),
			(this.M7e(e.X, this.i7e.X, 3) &&
				this.M7e(e.Y, this.i7e.Y, 3) &&
				this.M7e(e.Z, this.i7e.Z, 3)) ||
				ModelManager_1.ModelManager.InteractionModel.SetInteractionHintDisable(
					!1,
				));
	}
	M7e(e, t, i) {
		return (e = Math.ceil(e) - Math.ceil(t)) < i && -1 * i < e;
	}
	d7e() {
		var e,
			t,
			i = ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityId();
		(!(i = EntitySystem_1.EntitySystem.Get(i)) ||
			((t = Global_1.Global.BaseCharacter),
			(e = i.GetComponent(1)?.Owner),
			t &&
				i &&
				e &&
				((i = e.K2_GetActorLocation()),
				(e = t.K2_GetActorLocation()),
				(t = UE.KismetMathLibrary.Vector_Distance(i, e)),
				ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceViewCloseDistance() <
					t))) &&
			this.CloseMe();
	}
	OnBeforeDestroy() {
		this.p7e(),
			this.I9e(),
			ModelManager_1.ModelManager.InteractionModel.SetInteractionHintDisable(
				!1,
			);
	}
}
exports.AdviceInfoView = AdviceInfoView;
