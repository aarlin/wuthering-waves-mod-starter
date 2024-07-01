"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotOptionItem = void 0);
const UE = require("ue"),
	GlobalConfigFromCsvByName_1 = require("../../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	TalkOptionIconById_1 = require("../../../../Core/Define/ConfigQuery/TalkOptionIconById"),
	TextById_1 = require("../../../../Core/Define/ConfigQuery/TextById"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	LevelGameplayActionsDefine_1 = require("../../../LevelGamePlay/LevelGameplayActionsDefine"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ToggleActionItem_1 = require("../../Common/Toggle/ToggleActionItem"),
	TsInteractionUtils_1 = require("../../Interaction/TsInteractionUtils"),
	PlotSubtitleView_1 = require("../../Sequence/Subtitle/PlotSubtitleView"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	PlotController_1 = require("../PlotController"),
	SequenceController_1 = require("../Sequence/SequenceController"),
	PlotView_1 = require("./PlotView");
class PlotOptionItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(e) {
		super(),
			(this.$1i = void 0),
			(this.vJi = 0),
			(this.Option = void 0),
			(this.MJi = ""),
			(this.SJi = void 0),
			(this.EJi = void 0),
			(this.yJi = 0),
			(this.t_i = void 0),
			(this.OptionIndex = -1),
			(this.IJi = !1),
			(this.TJi = void 0),
			(this.a_i = !1),
			(this.T7e = () => {
				var e = this.$1i.GetToggleItem().GetToggleState();
				return !this.a_i || 1 !== e;
			}),
			(this.__i = () => {
				this.t_i && this.t_i(this);
			}),
			(this.OptionClick = (e = !0) => {
				if (
					e &&
					!this.a_i &&
					ModelManager_1.ModelManager.PlotModel.OptionEnable
				)
					switch (((this.a_i = !0), this.vJi)) {
						case 0:
							this.SJi
								? (PlotController_1.PlotController.EndInteraction(
										"Flow" === this.EJi.Type.Type,
									),
									TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(
										this.EJi,
										this.SJi,
									))
								: PlotController_1.PlotController.EndInteraction();
							break;
						case 1:
							this.Option.ReadMarkEnabled &&
								ModelManager_1.ModelManager.PlotModel.MarkGrayOption(
									this.yJi,
									this.OptionIndex,
								),
								this.TJi instanceof PlotView_1.PlotView
									? ControllerHolder_1.ControllerHolder.FlowController.FlowShowTalk.SelectOption(
											this.OptionIndex,
											this.Option.Actions,
										)
									: SequenceController_1.SequenceController.SelectOption(
											this.OptionIndex,
										);
					}
			}),
			(this.TJi = e);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		(this.a_i = !1),
			(this.$1i = new ToggleActionItem_1.ToggleActionItem(this.GetItem(0))),
			this.$1i.SetFunction(this.OptionClick),
			this.$1i.GetToggleItem().OnUndeterminedClicked.Add(this.OptionClick);
		var e = this.$1i.GetToggleItem();
		e.SetToggleState(1),
			e.SetToggleState(0),
			e.CanExecuteChange.Bind(this.T7e),
			this.LJi();
	}
	OnBeforeDestroy() {
		this.DJi(), this.$1i.Destroy();
	}
	LJi() {
		this.$1i.GetToggleItem().OnHover.Add(this.__i);
	}
	DJi() {
		this.$1i.GetToggleItem().OnHover.Clear();
	}
	BindOnHover(e) {
		this.t_i = e;
	}
	SetFollowItemActive(e) {
		this.GetItem(1).SetUIActive(e);
	}
	SetupSubtitleOption(e, t) {
		(this.vJi = 1),
			(this.Option = e),
			(this.MJi = e.TidTalkOption),
			(this.yJi = t),
			(this.OptionIndex = ModelManager_1.ModelManager.PlotModel.GetOptionIndex(
				e,
				t,
			)),
			(e = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(this.MJi)),
			this.RJi(this.f_i(), e);
	}
	SetupInteractiveOption(e, t) {
		(this.vJi = 0),
			(this.EJi = e),
			(this.SJi = t),
			(t = PublicUtil_1.PublicUtil.GetConfigTextByKey(e.TidContent)),
			this.RJi(this.f_i(), t);
	}
	SetupLeaveOption(e) {
		(this.IJi = !0),
			(this.vJi = 0),
			(this.EJi = void 0),
			(this.SJi = void 0),
			this.RJi(this.f_i(), e);
	}
	f_i() {
		let e;
		switch (this.vJi) {
			case 0: {
				if (!this.EJi) {
					var t = this.IsLeaveItem() ? "Leave" : "Dialog";
					e = this.UJi(t);
					break;
				}
				if (this.IsTask()) {
					var i = this.EJi.Context;
					if (!i) break;
					let o;
					switch (i.Type) {
						case 2:
							o = i.QuestId;
							break;
						case 6:
							o = i.TreeConfigId;
					}
					if (void 0 === o) break;
					if (!(t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(o)))
						break;
					(t = ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfig(
						t.QuestMarkId,
					)),
						(e = t?.NpcTaskIcon);
					break;
				}
				let o = "Dialog";
				(o = 1 === this.Option?.OptionStyle ? "OS" : this.EJi.Icon ?? "Dialog"),
					(e = this.UJi(o));
				break;
			}
			case 1:
				this.Option &&
					((t = this.Option.Icon ?? 1),
					(t = TalkOptionIconById_1.configTalkOptionIconById.GetConfig(t))) &&
					(e = t.Icon);
		}
		return e ?? "";
	}
	RJi(e, t) {
		let i = t;
		1 === this.vJi &&
			(i = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(i)),
			this.$1i.SetToggleTexture(e),
			this.$1i.SetToggleText(i);
	}
	UJi(e) {
		return void 0 ===
			(e =
				GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
					"EInteractIcon." + e,
				) ??
				GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
					"EInteractDefaultIcon." + e,
				))
			? ""
			: e.Value;
	}
	IsTask() {
		var e = this.EJi?.Context;
		return (
			!!e &&
			(2 === e.Type ||
				(6 === e.Type &&
					e.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest))
		);
	}
	IsOpenSystemBoard() {
		if ("Actions" === this.EJi?.Type?.Type)
			for (const e of (this.EJi?.Type).Actions)
				if ("OpenSystemBoard" === e.Name) return !0;
		return !1;
	}
	IsLeaveItem() {
		return this.IJi;
	}
	SetToggleGray() {
		this.CheckToggleGray() && this.$1i.GetToggleItem().SetToggleState(2);
	}
	CheckToggleGray() {
		return (
			!!this.Option?.ReadMarkEnabled &&
			ModelManager_1.ModelManager.PlotModel.IsOptionGray(
				this.yJi,
				this.OptionIndex,
			)
		);
	}
	Refresh(e, t, i) {
		e
			? e instanceof LevelGameplayActionsDefine_1.CommonInteractOption
				? this.AJi(e)
				: this.PJi(e)
			: this.xJi(),
			(this.a_i = !1),
			this.$1i.GetToggleItem().SetToggleState(0),
			this.SetToggleGray(),
			this.SetFollowItemActive(!1);
	}
	AJi(e) {
		this.TJi instanceof PlotSubtitleView_1.PlotSubtitleView ||
			(this.SetupInteractiveOption(e, this.TJi.InteractController),
			this.SetActive(!0));
	}
	xJi() {
		var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
			TextById_1.configTextById.GetConfig("Leave").Text,
		);
		this.SetupLeaveOption(e);
	}
	PJi(e) {
		this.SetupSubtitleOption(e, this.TJi.CurrentSubtitle.Id);
	}
	GetToggleItem() {
		return this.$1i?.GetToggleItem();
	}
}
exports.PlotOptionItem = PlotOptionItem;
