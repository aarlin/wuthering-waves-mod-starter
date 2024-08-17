"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelUpView = void 0);
const UE = require("ue"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	MapNoteById_1 = require("../../../../Core/Define/ConfigQuery/MapNoteById"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	EffectSystem_1 = require("../../../Effect/EffectSystem"),
	Global_1 = require("../../../Global"),
	GlobalData_1 = require("../../../GlobalData"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	EffectUtil_1 = require("../../../Utils/EffectUtil");
class LevelUpView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.opi = 0),
			(this.wvt = !1),
			(this.Bvt = !1),
			(this.bvt = !1),
			(this.Kvt = !1),
			(this.qvt = 0),
			(this.Gvt = 0),
			(this.Nvt = 0),
			(this.Ovt = 0),
			(this.kvt = 0),
			(this.w0t = 0),
			(this.rpi = !1),
			(this.Fvt = void 0),
			(this.Vvt =
				CommonParamById_1.configCommonParamById.GetIntConfig("ExpDisplayTime")),
			(this.Hvt = CommonParamById_1.configCommonParamById.GetIntConfig(
				"ExpDisplayCloseTime",
			)),
			(this.jvt = (e) => {
				(this.qvt += this.kvt * e),
					this.qvt >= this.Nvt &&
						((this.qvt = this.Nvt),
						TimerSystem_1.TimerSystem.Remove(this.Fvt),
						this.npi()),
					this.Wvt();
			}),
			(this.AMe = () => {
				this.CloseMe();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UISprite],
		];
	}
	OnStart() {
		var e = ModelManager_1.ModelManager.LevelUpModel.GetCacheData();
		ModelManager_1.ModelManager.LevelUpModel.ClearCacheData(),
			(this.wvt = e.CurLevel > e.PreLevel),
			(this.Bvt = e.AddExp),
			(this.bvt = !1),
			(this.Kvt = !1),
			(this.w0t = e.CurLevel),
			(this.rpi = !this.wvt),
			this.GetText(0).SetText((this.Bvt ? e.PreLevel : e.CurLevel).toString()),
			(this.qvt = this.Bvt ? e.PreExp : e.CurExp),
			(this.Ovt =
				ConfigManager_1.ConfigManager.FunctionConfig.GetPlayerLevelConfig(
					e.CurLevel,
				).PlayerExp),
			(this.Gvt = this.Bvt
				? ConfigManager_1.ConfigManager.FunctionConfig.GetPlayerLevelConfig(
						e.PreLevel,
					).PlayerExp
				: this.Ovt),
			(this.Nvt = this.wvt ? e.CurExp + this.Gvt : e.CurExp),
			(this.kvt = (this.Nvt - this.qvt) / this.Vvt),
			this.Wvt(),
			this.wvt &&
				this.UiViewSequence.AddSequenceFinishEvent("LevelUp", () => {
					(this.rpi = !0), this.npi();
				});
	}
	npi() {
		this.rpi && this.qvt >= this.Nvt && this.CloseMe();
	}
	OnBeforeShow() {
		this.wvt && this.spi(), this.Bvt && this.api();
	}
	OnAfterShow() {
		this.Bvt
			? (this.Fvt = TimerSystem_1.TimerSystem.Forever(
					this.jvt,
					TimerSystem_1.MIN_TIME,
				))
			: (this.Fvt = TimerSystem_1.TimerSystem.Delay(() => {
					this.CloseMe();
				}, this.Hvt));
	}
	get hpi() {
		return this.wvt && this.qvt >= this.Gvt;
	}
	Wvt() {
		this.Fvt &&
			!this.Kvt &&
			this.hpi &&
			((this.Kvt = !0),
			this.GetText(0).SetText(this.w0t.toString()),
			this.UiViewSequence?.PlaySequence("LevelUp"));
		var e = this.Kvt ? this.qvt - this.Gvt : this.qvt,
			t = this.Kvt ? this.Ovt : this.Gvt;
		this.GetText(1).SetText(Math.round(e) + "/" + t),
			this.GetSprite(2).SetFillAmount(e / t),
			this.Fvt &&
				t < e &&
				!this.bvt &&
				((this.bvt = !0), this.UiViewSequence.PlaySequence("Stuck"));
	}
	OnBeforeDestroy() {
		this.Fvt &&
			TimerSystem_1.TimerSystem.Has(this.Fvt) &&
			TimerSystem_1.TimerSystem.Remove(this.Fvt),
			this.lpi();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.PlotNetworkStart,
			this.AMe,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.PlotNetworkStart,
			this.AMe,
		);
	}
	api() {
		if (ModelManager_1.ModelManager.LevelUpModel.CanBreakTipsShowFlag)
			for (const t of MapNoteById_1.configMapNoteById.GetConfig(4)
				.QuestIdList) {
				var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t);
				if (2 === e || 1 === e) {
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"WorldLevelUpgradeNotice",
					),
						(ModelManager_1.ModelManager.LevelUpModel.CanBreakTipsShowFlag =
							!1);
					break;
				}
			}
	}
	spi() {
		var e, t, i, s;
		Global_1.Global.BaseCharacter &&
			(e = EffectUtil_1.EffectUtil.GetEffectPath("WorldLevelUpEffect")) &&
			0 !== e.length &&
			((t = (i = Global_1.Global.BaseCharacter).GetTransform()),
			(i = i.CapsuleComponent.CapsuleHalfHeight),
			((s = t.GetLocation()).Z -= i),
			t.SetLocation(s),
			EffectSystem_1.EffectSystem.IsValid(this.opi) ||
				((this.opi = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(
					GlobalData_1.GlobalData.World,
					t,
					e,
					"[LevelUpView.PlayLevelUpEffect]",
				)),
				EffectSystem_1.EffectSystem.IsValid(this.opi)) ||
				(this.opi = 0));
	}
	lpi() {
		EffectSystem_1.EffectSystem.IsValid(this.opi) &&
			(EffectSystem_1.EffectSystem.StopEffectById(
				this.opi,
				"[LevelUpView.RecycleEffect]",
				!0,
			),
			(this.opi = 0));
	}
}
exports.LevelUpView = LevelUpView;
