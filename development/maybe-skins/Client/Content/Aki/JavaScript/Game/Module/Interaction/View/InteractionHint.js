"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InteractionHint = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	GlobalConfigFromCsvByName_1 = require("../../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem"),
	ToggleActionItem_1 = require("../../Common/Toggle/ToggleActionItem"),
	InteractionDefine_1 = require("../InteractionDefine");
class InteractionHint extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0),
			(this.$1i = void 0),
			(this.Y1i = 0),
			(this.J1i = void 0),
			(this.z1i = void 0),
			(this.Z1i = void 0),
			(this.e_i = void 0),
			(this.t_i = void 0),
			(this.i_i = void 0),
			(this.o_i = void 0),
			(this.r_i = void 0),
			(this.gIt = 0),
			(this.$0t = void 0),
			(this.n_i = void 0),
			(this.s_i = void 0),
			(this.a_i = !1),
			(this.$En = void 0),
			(this.dKe = () => {
				this.RefreshChangeInteractionAction();
			}),
			(this.h_i = () =>
				!ModelManager_1.ModelManager.InteractionModel.InInteractCd()),
			(this.l_i = (e) => {
				this.s_i && this.s_i(e, this.ActorIndex);
			}),
			(this.__i = () => {
				this.t_i && this.t_i(this);
			}),
			(this.u_i = () => {
				this.i_i && this.i_i(this);
			}),
			(this.c_i = 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UINiagara],
			[3, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		(this.$1i = new ToggleActionItem_1.ToggleActionItem(this.GetItem(0))),
			this.m_i(),
			(this.Z1i = this.$1i.GetToggleText()),
			(this.e_i = this.GetUiNiagara(1)),
			this.Z1i.OnSelfLanguageChange.Bind(() => {
				this.C4e();
			});
		var e = this.GetItem(2),
			t =
				((this.o_i = new InputMultiKeyItem_1.InputMultiKeyItem()),
				this.GetItem(3));
		(this.r_i = new InputMultiKeyItem_1.InputMultiKeyItem(
			!0,
			!0,
			"Hint_" + this.GridIndex,
		)),
			await Promise.all([
				this.o_i.CreateThenShowByActorAsync(e.GetOwner()),
				this.r_i.CreateThenShowByActorAsync(t.GetOwner()),
			]);
	}
	OnStart() {
		this.RefreshInteractKeyItem(),
			this.RefreshChangeInteractionAction(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.dKe,
			);
	}
	OnBeforeDestroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnPlatformChanged,
			this.dKe,
		),
			this.YEn(),
			this.C_i(),
			(this.$1i = void 0),
			this.Z1i.OnSelfLanguageChange.Unbind(),
			(this.Z1i = void 0),
			(this.J1i = void 0),
			(this.t_i = void 0),
			(this.Y1i = -1),
			(this.z1i = void 0),
			(this.e_i = void 0),
			(this.o_i = void 0),
			(this.r_i = void 0);
	}
	Refresh(e, t, i) {
		(this.Y1i = this.GridIndex),
			(this.J1i = e.GetComponent(103)),
			(this.z1i = e.GetComponent(102)),
			this.z1i &&
				((this.gIt = this.z1i.DropItemId), this.gIt) &&
				(this.$0t =
					ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
						this.gIt,
					));
		let n = InteractionDefine_1.qualityColorList[0];
		this.$0t &&
			0 < (e = this.$0t.QualityId) &&
			(n = InteractionDefine_1.qualityColorList[e - 1]),
			(this.n_i = n),
			this.C4e(),
			this.d_i(),
			this.JEn(),
			this.zEn();
	}
	Clear() {
		(this.Y1i = -1), (this.J1i = void 0), (this.z1i = void 0);
	}
	OnSelected(e) {
		this.SetSelected(!0);
	}
	OnDeselected(e) {
		this.SetSelected(!1);
	}
	GetKey(e, t) {
		return this.GridIndex;
	}
	RefreshChangeInteractionAction() {
		var e;
		ModelManager_1.ModelManager.PlatformModel.IsGamepad()
			? ((e = {
					ActionOrAxisName: InputMappingsDefine_1.actionMappings.切换交互,
				}),
				this.o_i.RefreshByActionOrAxis(e))
			: ((e = {
					ActionOrAxisName: InputMappingsDefine_1.axisMappings.WheelAxis,
				}),
				this.o_i.RefreshByActionOrAxis(e));
	}
	RefreshInteractKeyItem() {
		var e = ModelManager_1.ModelManager.InteractionModel,
			t = {
				ActionOrAxisName: (t =
					(this.r_i.Reset(),
					void 0 !==
					ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity
						? InputMappingsDefine_1.actionMappings.UI键盘F手柄A
						: InputMappingsDefine_1.actionMappings.通用交互)),
				IsLongPressDisable: !this.a_i,
				LongPressTime: e.AutoLongPressTime,
				DelayPressTime: e.ShowLongPressTime,
				IsShowLongPressWhenPress: !0,
				IsShowLongPressWhenRelease: !1,
				IsTextArrowVisible: !1,
				IsShowTextArrowWhenPress: !1,
				IsShowTextArrowWhenRelease: !1,
			};
		this.r_i?.RefreshByActionOrAxis(t);
	}
	SetLongPressTime(e) {
		this.r_i?.SetLongPressTime(e);
	}
	g_i() {
		return this.z1i?.IsDropItem() ?? !1;
	}
	C4e() {
		var e, t;
		this.Z1i &&
			((e = this.f_i()),
			(t = this.p_i()),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Test",
					8,
					"[InteractionHint]刷新交互列表项名称",
					["interactText", t],
					["iconPath", e],
				),
			this.$1i.SetToggleTexture(e),
			this.$1i.SetToggleText(t));
	}
	p_i() {
		if (
			(e = ModelManager_1.ModelManager.InteractionModel.GetOptionNameByIndex(
				this.ActorIndex,
			))
		)
			return (
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Test", 8, "[InteractionHint]GetInteractText", [
						"optionName",
						e,
					]),
				PublicUtil_1.PublicUtil.GetConfigTextByKey(e)
			);
		if (
			(0, RegisterComponent_1.isComponentInstance)(this.J1i, 178) &&
			(e = this.J1i.GetInteractController().DefaultShowOption)
		)
			return (
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Test", 8, "[InteractionHint]GetInteractText", [
						"showOption",
						e,
					]),
				e
			);
		if (this.z1i) {
			var e = this.z1i.DropItemCount,
				t = this.z1i.PawnName;
			if (
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Test",
						8,
						"[InteractionHint]GetInteractText",
						["PawnName", t],
						["count", e],
					),
				!StringUtils_1.StringUtils.IsEmpty(t))
			)
				return this.g_i() && 1 < e ? t + "x" + e : t;
		}
		return "";
	}
	f_i() {
		let e = "";
		if (this.g_i()) {
			var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
				this.gIt,
			);
			e = t?.IconMiddle;
		} else if ((0, RegisterComponent_1.isComponentInstance)(this.J1i, 178))
			if ("Collect" === (t = this.J1i.GetInteractController().InteractIcon)) {
				var i =
						this.J1i.GetInteractController().CreatureData.GetPbEntityInitData(),
					n = (0, IComponent_1.getComponent)(
						i.ComponentsData,
						"CollectComponent",
					);
				i =
					((e = this.v_i("Dialog")),
					(0, IComponent_1.getComponent)(i.ComponentsData, "RewardComponent"));
				if (
					n &&
					((n = i.RewardId),
					0 <
						(i =
							ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
								n,
							).DropPreview).size)
				)
					for (const t of i.keys()) {
						e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
							Number(t),
						).IconMiddle;
						break;
					}
			} else
				e =
					"BigTeleporter" === t ||
					"SmallTeleporter" === t ||
					"TreasureBox" === t ||
					"UnknownCollect" === t
						? this.M_i(t)
						: this.v_i(t);
		else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Interaction",
					37,
					"InteractionHit.SetIconAndEffect 旧版交互已经废除",
				);
		return e ?? "";
	}
	d_i() {
		this.g_i()
			? ((this.e_i.ColorParameter.Get("Color").Constant = this.n_i),
				this.e_i.SetUIActive(!0))
			: this.e_i.SetUIActive(!1);
	}
	M_i(e) {
		return void 0 ===
			(e =
				GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
					"EInteractDefaultIcon." + e,
				))
			? ""
			: e.Value;
	}
	v_i(e) {
		return void 0 ===
			(e =
				GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
					"EInteractIcon." + e,
				))
			? ""
			: e.Value;
	}
	m_i() {
		var e = this.$1i.GetToggleItem();
		e.CanExecuteChange.Bind(this.h_i),
			e.OnStateChange.Add(this.l_i),
			e.OnHover.Add(this.__i),
			e.OnUnHover.Add(this.u_i);
	}
	C_i() {
		var e;
		this.$1i &&
			((e = this.$1i.GetToggleItem()).OnStateChange.Clear(),
			e.CanExecuteChange.Unbind(),
			e.OnHover.Clear(),
			e.OnUnHover.Clear());
	}
	SetSelected(e) {
		(this.a_i = e),
			this.JEn(),
			this.YEn(),
			(this.$En = TimerSystem_1.TimerSystem.Next(() => {
				this.zEn();
			}));
		var t = this.$1i.GetToggleItem();
		e ? t.SetToggleState(1, !1) : t.SetToggleState(0, !1);
	}
	YEn() {
		this.$En &&
			(TimerSystem_1.TimerSystem.Has(this.$En) &&
				TimerSystem_1.TimerSystem.Remove(this.$En),
			(this.$En = void 0));
	}
	JEn() {
		this.o_i?.SetActive(
			void 0 ===
				ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity &&
				this.a_i &&
				1 < ModelManager_1.ModelManager.InteractionModel.GetInteractItemCount(),
		);
	}
	zEn() {
		this.r_i?.SetLongPressDisable(!this.a_i), this.r_i?.SetActive(this.a_i);
	}
	BindOnHover(e) {
		this.t_i = e;
	}
	BindOnUnHover(e) {
		this.i_i = e;
	}
	BindOnToggleStateChanged(e) {
		this.s_i = e;
	}
	get ActorIndex() {
		return this.Y1i;
	}
	GetPriority() {
		return this.c_i;
	}
	UpdatePriority() {
		(0, RegisterComponent_1.isComponentInstance)(this.J1i, 178) &&
			(this.c_i = this.J1i.GetInteractController().InteractEntity.Priority);
	}
	GetButtonForGuide() {
		return this.GetItem(0);
	}
}
exports.InteractionHint = InteractionHint;
