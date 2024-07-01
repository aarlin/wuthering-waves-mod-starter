"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ElementPanel = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
	ElementItem_1 = require("./ElementItem");
class TipPanel extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UIText],
		];
	}
	UpdateNum(e) {
		this.GetText(1).SetText(e.toString()),
			0 === e
				? LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(2),
						"Roguelike_Yuansu_Empty",
					)
				: ((e =
						ConfigManager_1.ConfigManager.RoguelikeConfig?.GetElementLevelConfigById(
							e,
						)),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(2),
						e.TextId,
						e.TextIdArgs,
					));
	}
}
class ElementPanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.rao = void 0),
			(this.Mhi = void 0),
			(this.jhi = () => new ElementItem_1.ElementItem()),
			(this.nao = (e) => {
				switch (e) {
					case 1:
						this.GetExtendToggle(0).SetToggleState(1),
							this.GetItem(4).SetUIActive(!0);
						break;
					case 0:
						this.GetExtendToggle(0).SetToggleState(0),
							this.GetItem(4).SetUIActive(!1);
				}
			}),
			(this.sao = (e) => {
				switch (e) {
					case 1:
						this.GetExtendToggle(5).SetToggleState(1),
							this.GetItem(4).SetUIActive(!0);
						break;
					case 0:
						this.GetExtendToggle(5).SetToggleState(0),
							this.GetItem(4).SetUIActive(!1);
				}
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UIHorizontalLayout],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIExtendToggle],
		]),
			(this.BtnBindInfo = [
				[5, this.nao],
				[0, this.sao],
			]);
	}
	async OnBeforeStartAsync() {
		(this.rao = new TipPanel()),
			await this.rao.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
	}
	OnStart() {
		(this.Mhi = new GenericLayout_1.GenericLayout(
			this.GetHorizontalLayout(2),
			this.jhi,
		)),
			this.GetExtendToggle(5).SetToggleState(0, !0),
			this.GetItem(4).SetUIActive(!1);
	}
	Refresh(e = void 0) {
		var t = new Array(),
			[, i] =
				ModelManager_1.ModelManager.RoguelikeModel.GetSortElementInfoArrayMap(
					e?.ElementDict,
				);
		for (const e of RoguelikeDefine_1.sortElementArray) {
			let n = i.get(e);
			(n = n || new RoguelikeDefine_1.ElementInfo(e, 0)), t.push(n);
		}
		this.Mhi.RefreshByData(t);
		let n = 0;
		t.forEach((e) => {
			7 !== e.ElementId && (n += e.Count);
		}),
			void 0 === e || e.ElementDict.size <= 0
				? this.GetText(1).SetText(n.toString())
				: LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(1),
						RoguelikeDefine_1.ROGUELIKEVIEW_17_TEXT,
						n.toString(),
					),
			this.rao.UpdateNum(n);
	}
}
exports.ElementPanel = ElementPanel;
