"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemView = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class ItemView extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(),
			(this.rmi = void 0),
			(this.EPe = void 0),
			(this.nmi = void 0),
			(this.s_i = (e) => {
				this.nmi && this.nmi(this.rmi);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIItem],
			[2, UE.UISprite],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIExtendToggle],
			[6, UE.UISprite],
			[7, UE.UISprite],
			[8, UE.UISprite],
			[9, UE.UISprite],
			[10, UE.UISprite],
			[11, UE.UISprite],
			[12, UE.UISprite],
			[13, UE.UISprite],
			[14, UE.UIItem],
			[15, UE.UITexture],
			[16, UE.UIItem],
			[17, UE.UISprite],
			[18, UE.UIText],
		]),
			(this.BtnBindInfo = [[5, this.s_i]]);
	}
	OnStart() {
		this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
	}
	OnBeforeDestroy() {
		(this.nmi = void 0), this.EPe.Clear(), (this.EPe = void 0);
	}
	BindOnItemButtonClickedCallback(e) {
		this.nmi = e;
	}
	Refresh(e, t, i) {
		this.RefreshItemViewByItemData(e), this.SetSelected(t);
	}
	OnSelected(e) {
		this.SetSelected(!0);
	}
	OnDeselected(e) {
		this.SetSelected(!1);
	}
	RefreshItemViewByItemData(e) {
		var t = (e = (this.rmi = e).GetItemViewInfo()).QualityId,
			i = e.IsLock,
			r = e.IsNewItem;
		e = e.ItemDataType;
		switch (
			(this.Odi(),
			this.kdi(t),
			this.Fdi(i),
			this.SetIsNewItem(r),
			this.RefreshCdTimeDisplay(),
			e)
		) {
			case 0:
				var s = this.rmi.GetCount();
				this.Vdi(s);
				break;
			case 2:
				(s = this.rmi.GetItemDataBase().GetUniqueId()),
					(s =
						ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
							s,
						).GetLevel()),
					this.Hdi(s);
				break;
			case 3:
				(s = this.rmi.GetItemDataBase().GetUniqueId()),
					(s =
						ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
							s,
						).GetPhantomLevel()),
					this.Hdi(s);
				break;
			default:
				(s = this.rmi.GetCount()), this.Vdi(s);
		}
	}
	Odi() {
		var e = this.GetTexture(0);
		this.SetItemIcon(e, this.rmi.GetConfigId());
	}
	kdi(e) {
		var t = this.GetSprite(2);
		t && this.SetItemQualityIcon(t, this.rmi.GetConfigId());
	}
	SetSelected(e) {
		var t = this.GetExtendToggle(5);
		e ? t.SetToggleState(1, !1) : t.SetToggleState(0, !1);
	}
	Fdi(e) {
		var t = this.GetSprite(6);
		t && t.SetUIActive(e);
	}
	SetIsNewItem(e) {
		this.GetSprite(7).SetUIActive(e);
	}
	Vdi(e) {
		var t = this.GetText(4);
		t &&
			(t.SetText(e.toString()), t.SetUIActive(!0), (e = this.GetText(3))) &&
			e.SetUIActive(!1);
	}
	Hdi(e) {
		var t = this.GetText(3);
		t &&
			(LguiUtil_1.LguiUtil.SetLocalText(t, "LevelShow", e),
			t.SetUIActive(!0),
			(e = this.GetText(4))) &&
			e.SetUIActive(!1);
	}
	SetRoleHeadVisible(e) {
		this.GetItem(14).SetUIActive(e);
	}
	jdi(e) {
		var t = this.GetItem(16);
		t.bIsUIActive !== e &&
			(t.SetUIActive(e), e) &&
			this.EPe.PlayLevelSequenceByName("EnterCd");
	}
	RefreshCdTimeDisplay() {
		var e = this.rmi.GetConfigId(),
			t = ModelManager_1.ModelManager.BuffItemModel,
			i = t.GetBuffItemRemainCdTime(e);
		i <= 0
			? this.jdi(!1)
			: ((t = t.GetBuffItemTotalCdTime(e)), this.Wdi(i, t), this.jdi(!0));
	}
	Wdi(e, t) {
		e = Math.ceil(e);
		var i = this.GetSprite(17),
			r = this.GetText(18);
		i.SetFillAmount(e / t), r.SetText(e.toString());
	}
}
exports.ItemView = ItemView;
