"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleVisionAttribute = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
class RoleVisionAttributeSt {
	constructor() {
		(this.Data = void 0), (this.NeedCheckBg = !1);
	}
}
class RoleVisionAttribute extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.AttributeScroller = void 0),
			(this.wqe = void 0),
			(this.Bdo = () => new RoleVisionAttributeItem()),
			(this.wqe = e);
	}
	Init() {
		this.CreateThenShowByActor(this.wqe.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIVerticalLayout],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		this.AttributeScroller = new GenericLayout_1.GenericLayout(
			this.GetVerticalLayout(0),
			this.Bdo,
			this.GetItem(1).GetOwner(),
		);
	}
	Refresh(e, t = !1) {
		const i = new Array();
		e?.forEach((e) => {
			var r = new RoleVisionAttributeSt();
			(r.Data = e), (r.NeedCheckBg = t), i.push(r);
		}),
			this.AttributeScroller.RefreshByData(i);
	}
}
exports.RoleVisionAttribute = RoleVisionAttribute;
class RoleVisionAttributeItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0);
	}
	Refresh(e, t, i) {
		this.Update(e);
	}
	Clear() {}
	OnSelected(e) {}
	OnDeselected(e) {}
	GetKey(e, t) {
		return this.GridIndex;
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UITexture],
			[5, UE.UISprite],
		];
	}
	Update(e) {
		var t;
		e.NeedCheckBg && this.GetSprite(5).SetUIActive(this.GridIndex % 2 == 0),
			e.Data.IsUnknown
				? (this.GetText(0).SetText("???"),
					this.GetText(1).SetText("???"),
					this.GetTexture(4).SetUIActive(!1))
				: ((t =
						ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
							e.Data.Id,
						)),
					this.SetTextureByPath(t.Icon, this.GetTexture(4)),
					this.GetText(0).ShowTextNew(t.Name),
					this.GetItem(2).SetUIActive(2 === e.Data.AttributeType),
					this.GetText(3).SetUIActive(2 === e.Data.AttributeType),
					this.npt(e.Data));
	}
	npt(e) {
		4 === e.AttributeType || 1 === e.AttributeType || 3 === e.AttributeType
			? this.GetText(1).SetText(
					ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
						e.Id,
						e.BaseValue + e.AddValue,
						e.IsRatio,
					),
				)
			: (this.GetText(3).SetText(
					ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
						e.Id,
						e.AddValue,
						e.IsRatio,
					),
				),
				this.GetText(1).SetText(
					ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
						e.Id,
						e.BaseValue,
						e.IsRatio,
					),
				));
	}
	SetBgEnable(e) {
		this.GetSprite(5).SetUIActive(e);
	}
}
