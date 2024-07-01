"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SilentAreaInfoItem = void 0);
const UE = require("ue"),
	PublicUtil_1 = require("../../../../Common/PublicUtil"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	SilentAreaInfoSubItem_1 = require("./SilentAreaInfoSubItem");
class SilentAreaInfoItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.Rct = []);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	Initialize(e, t) {
		this.CreateByActorAsync(e).finally(() => {
			this.UpdateItem(t);
		});
	}
	async OnBeforeStartAsync() {
		var e = this.GetItem(1),
			t = new SilentAreaInfoSubItem_1.SilentAreaInfoSubItem();
		await t.CreateByActorAsync(e.GetOwner()), this.Rct.push(t);
	}
	UpdateItem(e) {
		this.Uct(e.TidMainTitle), this.Act(e.SubTitles);
	}
	Uct(e) {
		var t = this.GetText(0);
		e = PublicUtil_1.PublicUtil.GetConfigTextByKey(e);
		t?.SetText(e);
	}
	Act(e) {
		for (let n = 0; n < e.length; n++) {
			var t,
				i = e[n];
			let r;
			n < this.Rct.length
				? (r = this.Rct[n]).UpdateItem(i)
				: ((t = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(1), this.GetItem(2))),
					(r = new SilentAreaInfoSubItem_1.SilentAreaInfoSubItem()).Initialize(
						t.GetOwner(),
						i,
					),
					this.Rct.push(r));
		}
		this.Rct.forEach((t, i) => {
			t.SetActive(i < e.length);
		});
	}
}
exports.SilentAreaInfoItem = SilentAreaInfoItem;
