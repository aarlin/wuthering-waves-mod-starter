"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomSelectResultView = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiActorPool_1 = require("../../../Ui/UiActorPool"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
	PhantomSelectItem_1 = require("./PhantomSelectItem"),
	RogueSelectResultBaseView_1 = require("./RogueSelectResultBaseView");
class PhantomSelectResultView extends RogueSelectResultBaseView_1.RogueSelectResultBaseView {
	constructor() {
		super(...arguments),
			(this.Xso = void 0),
			(this.Dao = void 0),
			(this.Rao = void 0),
			(this.Uao = () => new PhantomSelectItem_1.PhantomSelectItem(!1)),
			(this.OnDescModelChange = () => {
				this.Refresh();
			});
	}
	async OnCreateAsync() {
		var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
			RoguelikeDefine_1.PHANTOM_SELECT_ITEM,
		);
		this.Rao = await UiActorPool_1.UiActorPool.GetAsync(e);
	}
	OnStart() {
		super.OnStart(),
			(this.Xso = this.OpenParam),
			this.Rao.UiItem.SetUIParent(
				this.GetHorizontalLayout(3).GetRootComponent(),
			),
			(this.Dao = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(3),
				this.Uao,
			));
	}
	OnBeforeDestroy() {
		this.Rao &&
			UiActorPool_1.UiActorPool.RecycleAsync(
				this.Rao,
				RoguelikeDefine_1.PHANTOM_SELECT_ITEM,
			);
	}
	OnBeforeShow() {
		this.Refresh();
	}
	Refresh() {
		this.Aao(), this.RefreshTitleText();
	}
	Aao() {
		this.Dao.RefreshByData([this.Xso.NewRogueGainEntry]);
	}
	RefreshTitleText() {
		void 0 === this.Xso.OldRogueGainEntry
			? this.GetText(4).ShowTextNew(RoguelikeDefine_1.ROGUELIKEVIEW_25_TEXT)
			: this.GetText(4).ShowTextNew(RoguelikeDefine_1.ROGUELIKEVIEW_19_TEXT);
	}
}
exports.PhantomSelectResultView = PhantomSelectResultView;
