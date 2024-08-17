"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NewSoundNormalItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	AdventureDefine_1 = require("../AdventureDefine"),
	NewSoundNormaPhantomItem_1 = require("./NewSoundNormaPhantomItem");
class NewSoundNormalItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(),
			(this.M6e = void 0),
			(this.S6e = () =>
				new NewSoundNormaPhantomItem_1.NewSoundNormaPhantomItem());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIVerticalLayout],
		];
	}
	OnStart() {
		this.M6e = new GenericLayout_1.GenericLayout(
			this.GetVerticalLayout(3),
			this.S6e,
		);
	}
	Update(e) {
		var t = this.GetText(0),
			i =
				((t =
					(LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.Conf.Name),
					this.GetTexture(1))),
				this.GetText(2));
		e.IsLock
			? (this.SetTextureByPath(e.Conf.LockBigIcon, t),
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					i,
					e.Conf.AttributesDescriptionUnlock,
				),
				this.M6e?.SetActive(!1))
			: (this.SetTextureByPath(e.Conf.BigIcon, t),
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					i,
					e.Conf.InstanceSubTypeDescription,
				),
				e.Conf.Secondary === AdventureDefine_1.EDungeonType.NoSoundArea &&
				e.Conf.PhantomId &&
				0 !== e.Conf.PhantomId.length
					? (this.M6e?.SetActive(!0), this.M6e?.RefreshByData(e.Conf.PhantomId))
					: this.M6e?.SetActive(!1));
	}
}
exports.NewSoundNormalItem = NewSoundNormalItem;
