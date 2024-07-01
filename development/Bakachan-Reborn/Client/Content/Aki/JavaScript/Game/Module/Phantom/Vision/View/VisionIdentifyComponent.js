"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelUpIdentifyComponent = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	PhantomDataBase_1 = require("../../PhantomBattle/Data/PhantomDataBase"),
	VisionIdentifyItem_1 = require("./VisionIdentifyItem");
class LevelUpIdentifyComponent extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.Layout = void 0),
			(this.T7i = void 0),
			(this.L7i = void 0),
			(this.D7i = void 0),
			(this.sGe = () => new VisionIdentifyItem_1.VisionIdentifyItem()),
			(this.T7i = e);
	}
	async Init(e) {
		(this.L7i = e), await this.CreateByActorAsync(this.T7i.GetOwner(), void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIVerticalLayout],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		(this.Layout = new GenericLayout_1.GenericLayout(
			this.GetVerticalLayout(0),
			this.sGe,
		)),
			this.GetItem(1).SetUIActive(!1);
	}
	async PlayUpdateAnimation(e) {
		await this.D7i?.Promise;
		let t = 0;
		const i = [],
			a =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionIdentifyAnimationTime();
		e.forEach((e) => {
			(e = this.Layout.GetLayoutItemByKey(e).PlaySequenceAndUpdate(t, a)),
				i.push(e),
				(t += a);
		}),
			await Promise.all(i);
	}
	Update(e, t) {
		if (((this.D7i = new CustomPromise_1.CustomPromise()), 0 < e.length)) {
			const i = new Array();
			e.forEach((e) => {
				var a = new PhantomDataBase_1.VisionSubPropViewData();
				(a.Data = e), (a.SourceView = this.L7i), (a.IfPreCache = t), i.push(a);
			}),
				this.Layout.RefreshByData(i, () => {
					this.D7i?.IsFulfilled() || this.D7i.SetResult(!0);
				});
		}
	}
}
exports.LevelUpIdentifyComponent = LevelUpIdentifyComponent;
