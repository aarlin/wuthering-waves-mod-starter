"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HelpView = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	Paragraph_1 = require("./Paragraph");
class HelpView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments), (this.cei = new Array());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	OnStart() {
		this.GetItem(2).SetUIActive(!1), this.AU();
	}
	AU() {
		var e = this.OpenParam,
			t =
				ConfigManager_1.ConfigManager.HelpConfig.GetHelpContentInfoByGroupId(e);
		if (0 < t.length) {
			this.GetText(0).ShowTextNew(t[0].Title);
			var i,
				r = t.length,
				a =
					(this.cei.forEach((e) => {
						e.SetActive(!1);
					}),
					this.GetItem(2)),
				s = this.GetItem(1);
			let e = 0;
			for (let n = 0; n < r; n++) {
				let r;
				e > this.cei.length - 1
					? ((i = LguiUtil_1.LguiUtil.CopyItem(a, s)),
						(r = new Paragraph_1.Paragraph(i.GetOwner())),
						this.cei.push(r))
					: (r = this.cei[e]),
					r.Refresh(t[n]),
					r.SetActive(!0),
					e++;
			}
		}
	}
}
exports.HelpView = HelpView;
