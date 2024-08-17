"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomAttrItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
	ElementItem_1 = require("./ElementItem"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class PhantomAttrItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.AffixEntry = void 0),
			(this.Mhi = void 0),
			(this.hao = void 0),
			(this.EPe = void 0),
			(this.jhi = () => new ElementItem_1.ElementItem());
	}
	Update(e) {
		(this.AffixEntry = e), this.PWt();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIHorizontalLayout],
			[2, UE.UIItem],
			[3, UE.UISprite],
			[4, UE.UISprite],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIText],
			[8, UE.UIHorizontalLayout],
		];
	}
	OnStart() {
		this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
			this.GetRootItem(),
		);
	}
	Refresh(e, t, i) {
		this.Update(e);
	}
	PWt() {
		this.lao(), this._ao(), this.o3e(), this.OPt();
	}
	lao() {
		var e = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.GetIsUnlock(
			this.AffixEntry,
		);
		this.GetSprite(3).SetUIActive(e), this.GetSprite(4).SetUIActive(!e);
	}
	_ao() {
		var e,
			t,
			i,
			o = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueAffixConfig(
				this.AffixEntry.Id,
			);
		o &&
			((e = ModelManager_1.ModelManager.RoguelikeModel.GetDescModel()),
			(t = this.GetText(0)),
			(i = this.GetText(7)).SetColor(
				this.AffixEntry?.IsUnlock
					? UE.Color.FromHex("BEFE58FF")
					: UE.Color.FromHex("ECE5D8FF"),
			),
			t.SetColor(
				this.AffixEntry?.IsUnlock
					? UE.Color.FromHex("BEFE58FF")
					: UE.Color.FromHex("ECE5D8FF"),
			),
			0 === e
				? (t.ShowTextNew(o.AffixDescSimple), i.ShowTextNew(o.AffixDescSimple))
				: (LguiUtil_1.LguiUtil.SetLocalTextNew(
						t,
						o.AffixDesc,
						...o.AffixDescParam,
					),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						i,
						o.AffixDesc,
						...o.AffixDescParam,
					)));
	}
	o3e() {
		var e = (e = this.GetText(0)).GetTextRenderSize().X < e.Width,
			t = this.GetHorizontalLayout(1).GetRootComponent().GetParentAsUIItem(),
			i = this.GetItem(6),
			o = this.GetItem(5)
				.GetOwner()
				.GetComponentByClass(UE.UISizeControlByOther.StaticClass()),
			r = (e ? t : i).GetOwner();
		o.SetTargetActor(r),
			t.SetUIActive(e),
			i.SetUIActive(!e),
			void 0 === this.Mhi &&
				(this.Mhi = new GenericLayout_1.GenericLayout(
					this.GetHorizontalLayout(1),
					this.jhi,
					void 0,
				)),
			void 0 === this.hao &&
				(this.hao = new GenericLayout_1.GenericLayout(
					this.GetHorizontalLayout(8),
					this.jhi,
					this.GetItem(2)?.GetOwner(),
				));
	}
	OPt() {
		var e = this.AffixEntry.GetSortElementInfoArrayByCount();
		this.Mhi?.RefreshByData(e), this.hao?.RefreshByData(e);
	}
	PlayComplete() {
		this.EPe.PlayLevelSequenceByName(RoguelikeDefine_1.COMPLETE);
	}
}
exports.PhantomAttrItem = PhantomAttrItem;
