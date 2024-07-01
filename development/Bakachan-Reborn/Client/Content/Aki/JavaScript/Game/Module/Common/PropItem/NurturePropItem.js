"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NurturePropItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	CommonComponentDefine_1 = require("../CommonComponentDefine");
class NurturePropItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(t = void 0, e = void 0, i = void 0) {
		super(),
			(this.$xt = void 0),
			(this.U4e = void 0),
			(this.Yxt = void 0),
			(this.Jxt = void 0),
			(this.zxt = 1),
			(this.Zxt = () => {
				var t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
						this.$xt.Id,
					),
					e =
						((this.$xt.RoleId = t.GetRoleId()),
						ConfigManager_1.ConfigManager.TextConfig.GetTextById(
							"WeaponLevel",
						));
				(this.$xt.BottomText = StringUtils_1.StringUtils.Format(
					e,
					t.GetLevel().toString(),
				)),
					(this.$xt.TopText = t.GetResonanceLevel().toString());
			}),
			(this.ewt = () => {
				var t =
					ConfigManager_1.ConfigManager.TextConfig.GetTextById("RoleCount");
				this.$xt.BottomText = StringUtils_1.StringUtils.Format(
					t,
					this.$xt.Count.toString(),
				);
			}),
			(this.NurturePropDataFunction = { 2: this.Zxt, 4: this.ewt }),
			(this.x4e = (t) => {
				var e;
				this.U4e && ((e = this.$xt ? this.$xt.Id : void 0), this.U4e(t, e));
			}),
			(this.twt = () => {
				this.Yxt && this.Yxt(this.$xt.Id);
			}),
			(this.iwt = () => {
				this.Jxt && this.Jxt(this.$xt.Id);
			}),
			t && this.CreateThenShowByActor(t.GetOwner()),
			(this.owt = e),
			(this.rwt = i);
	}
	SetControlFunction(t) {
		this.owt = t;
	}
	SetBottomTextFunction(t) {
		this.rwt = t;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UITexture],
			[5, UE.UISprite],
			[6, UE.UIItem],
			[7, UE.UITexture],
			[8, UE.UIItem],
			[9, UE.UIText],
			[10, UE.UIItem],
			[11, UE.UIText],
			[12, UE.UIItem],
			[13, UE.UIText],
			[14, UE.UISprite],
			[15, UE.UIButtonComponent],
			[16, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[0, this.x4e],
				[15, this.twt],
				[16, this.iwt],
			]);
	}
	OnStart() {
		this.GetItem(12).SetUIActive(!1);
	}
	nwt(t) {
		t === CommonComponentDefine_1.WEAPON_ITEMTYPE
			? ((this.$xt.ItemType = 2), (this.$xt.IsSingle = !0))
			: t === CommonComponentDefine_1.WEAPONMATERIAL_ITEMTYPE &&
				((this.$xt.ItemType = 4), (this.$xt.IsSingle = !1));
	}
	swt() {
		var t;
		0 < this.$xt.RoleId
			? (this.GetItem(8).SetUIActive(!0),
				(t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
					this.$xt.RoleId,
				)),
				this.SetRoleIcon(t.RoleHeadIcon, this.GetTexture(7), this.$xt.RoleId))
			: this.GetItem(8).SetUIActive(!1);
	}
	awt() {
		this.$xt.TopText
			? (this.GetItem(10).SetUIActive(!0),
				this.GetText(9).SetText(this.$xt.TopText))
			: this.GetItem(10).SetUIActive(!1);
	}
	InitPropItem(t) {
		this.GetItem(1).SetUIActive(void 0 !== t),
			this.GetItem(3).SetUIActive(void 0 === t),
			t &&
				((this.$xt = new CommonComponentDefine_1.NurturePropItemData()),
				(this.$xt.Id = t),
				1 === this.zxt
					? this.UpdatePropItem()
					: 0 === this.zxt && this.UpdatePropItemByItemId());
	}
	SetUseType(t) {
		this.zxt = t;
	}
	UpdatePropItem() {
		var t = ModelManager_1.ModelManager.InventoryModel.GetWeaponItemData(
			this.$xt.Id,
		);
		t ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error("UiCommon", 9, "没有磁带数据", ["Id", this.$xt.Id])),
			(this.$xt.Count = t.GetCount()),
			this.nwt(t.GetType()),
			this.NurturePropDataFunction[this.$xt.ItemType](),
			this.SetItemIcon(this.GetTexture(4), t.GetConfigId()),
			this.SetItemQualityIcon(this.GetSprite(5), t.GetConfigId()),
			this.rwt
				? this.rwt(this.$xt.Id)
				: this.SetBottomText(this.$xt.BottomText),
			this.owt && this.owt(this.$xt.Id),
			this.UpdateLockState(t.GetIsLock()),
			this.swt(),
			this.awt();
	}
	UpdatePropItemByItemId() {
		this.SetItemIcon(this.GetTexture(4), this.$xt.Id),
			this.SetItemQualityIcon(this.GetSprite(5), this.$xt.Id),
			this.UpdateLockState(!1),
			this.awt(),
			this.swt();
	}
	SetToggleFunction(t) {
		this.U4e = t;
	}
	SetAddFunction(t) {
		this.Yxt = t;
	}
	SetReduceFunction(t) {
		this.Jxt = t;
	}
	UpdateLockState(t) {
		this.GetItem(6).SetUIActive(t);
	}
	GetIncId() {
		return this.$xt.Id;
	}
	SetControlActive(t) {
		t
			? (this.GetItem(12).SetUIActive(t),
				this.GetSprite(14).SetUIActive(this.$xt.IsSingle),
				this.GetText(13).SetUIActive(!this.$xt.IsSingle))
			: this.GetItem(12).SetUIActive(t);
	}
	SetControlNumber(t) {
		this.GetText(13).SetText(t);
	}
	SetToggleState(t, e = !0) {
		this.GetExtendToggle(0).SetToggleState(t, e);
	}
	SetToggleGroup(t) {
		this.GetExtendToggle(0).SetToggleGroup(t);
	}
	SetBottomText(t = void 0) {
		(t = t || this.$xt.BottomText), this.GetText(11).SetText(t);
	}
	SetBottomRichText() {
		this.GetText(11).SetRichText(!0);
	}
	SetAddPointDown(t) {
		this.GetButton(15).OnPointDownCallBack.Bind(() => {
			t(this.$xt.Id);
		});
	}
	SetAddPointUp(t) {
		this.GetButton(15).OnPointUpCallBack.Bind(() => {
			t(this.$xt.Id);
		});
	}
	SetReducePointDown(t) {
		this.GetButton(16).OnPointDownCallBack.Bind(() => {
			t(this.$xt.Id);
		});
	}
	SetReducePointUp(t) {
		this.GetButton(16).OnPointUpCallBack.Bind(() => {
			t(this.$xt.Id);
		});
	}
	OnBeforeDestroy() {
		this.GetButton(15).OnPointDownCallBack.Unbind(),
			this.GetButton(15).OnPointUpCallBack.Unbind(),
			this.GetButton(16).OnPointDownCallBack.Unbind(),
			this.GetButton(16).OnPointUpCallBack.Unbind();
	}
	Refresh(t, e, i) {
		this.InitPropItem(t),
			e ? this.SetToggleState(1, !1) : this.SetToggleState(0, !1);
	}
	OnSelected(t) {
		this.SetToggleState(1, t);
	}
	OnDeselected(t) {
		this.SetToggleState(0, t);
	}
}
exports.NurturePropItem = NurturePropItem;
