"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerDetailInformationBuffSubItem = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TowerDetailInformationBuffSubItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), (this.Pe = void 0), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[2, UE.UIText],
		];
	}
	Update(e) {
		(this.Pe = e), this.Og();
	}
	Og() {
		var e = this.Pe.Desc;
		this.GetText(2).SetText(e), (e = this.Pe.Name);
		("" !== (e = (this.GetText(1).SetText(e), this.Pe.IconPath)) &&
			void 0 !== e) ||
			(StringUtils_1.StringUtils.IsEmpty(e)
				? this.GetTexture(0).SetUIActive(!1)
				: (this.SetTextureByPath(e, this.GetTexture(0)),
					this.GetTexture(0).SetUIActive(!0)));
	}
}
exports.TowerDetailInformationBuffSubItem = TowerDetailInformationBuffSubItem;
