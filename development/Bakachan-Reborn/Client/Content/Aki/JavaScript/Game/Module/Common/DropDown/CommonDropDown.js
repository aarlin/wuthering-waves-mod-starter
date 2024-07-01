"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonDropDown = void 0);
const UE = require("ue"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	Transform_1 = require("../../../../Core/Utils/Math/Transform"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	DynamicMaskButton_1 = require("../../DynamicMask/DynamicMaskButton"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
class CommonDropDown extends UiPanelBase_1.UiPanelBase {
	constructor(t, e, i) {
		super(),
			(this.SourceItem = t),
			(this.CreateDropDownItem = e),
			(this.CreateTitleItem = i),
			(this.eGe = void 0),
			(this.uft = void 0),
			(this.oTt = CommonDefine_1.INVALID_VALUE),
			(this.rTt = void 0),
			(this.nTt = void 0),
			(this.sTt = 2),
			(this.aTt = !1),
			(this.hTt = Transform_1.Transform.Create()),
			(this.lTt = Vector_1.Vector.Create()),
			(this._Tt = void 0),
			(this.uTt = void 0),
			(this.RPr = void 0),
			(this.j7e = () => {
				var t = this.GetItem(1);
				t.bIsUIActive
					? this.dTt()
					: (t.SetUIActive(!0), (this.aTt = !0), this.CTt().finally(void 0));
			}),
			(this.sGe = (t, e, i) => (
				(e = this.CreateDropDownItem(e, t)),
				(t = this._Tt(t)),
				e.ShowDropDownItemBase(t, i),
				e.SetToggleFunction(this.gTt),
				e.SetCanExecuteFunction(this.fTt),
				{ Key: i, Value: e }
			)),
			(this.gTt = (t) => {
				var e = this.oTt;
				(this.oTt = t),
					this.pTt(e),
					this.vTt(),
					this.nTt?.(this.oTt, this.uft[this.oTt]);
			}),
			(this.fTt = (t) => this.oTt !== t),
			(this.dTt = () => {
				this.GetItem(1).SetUIActive(!1), this.MTt();
			}),
			(this.yTt = () => {
				var t, e, i;
				this.aTt &&
					(0 !== this.sTt &&
					(1 === this.sTt ||
						((t = (i = this.GetButton(0).RootUIComp).GetRootCanvas()),
						(e = UiLayer_1.UiLayer.GetLayerRootUiItem(
							UiLayerType_1.ELayerType.Pop,
						)),
						(e = Transform_1.Transform.Create(
							e.K2_GetComponentToWorld().Inverse(),
						)),
						this.hTt.FromUeTransform(this.RPr),
						this.hTt.ComposeTransforms(e, this.hTt),
						(e =
							i.GetLocalSpaceBottom() - this.eGe.GetRootUiItem().GetHeight()),
						this.hTt.TransformPosition(
							Vector_1.Vector.Create(0, e, 0),
							this.lTt,
						),
						(i = t.GetClipRectMin()),
						this.lTt.Y < i[0].Y))
						? this.ITt()
						: this.TTt(),
					(this.aTt = !1));
			});
	}
	async Init() {
		await this.CreateByActorAsync(this.SourceItem.GetOwner()).finally(() => {
			this.SetActive(!0);
		});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
			[2, UE.UILayoutBase],
			[3, UE.UIItem],
			[4, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.j7e]]);
	}
	OnStart() {
		(this.eGe = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetLayoutBase(2),
			this.sGe,
			this.GetItem(3),
		)),
			this.eGe.BindLateUpdate(this.yTt),
			this.GetItem(1).SetUIActive(!1),
			(this.uTt = this.CreateTitleItem(this.GetItem(4)));
	}
	OnBeforeDestroy() {
		this.eGe.UnBindLateUpdate(), this.rTt?.Destroy(), this.uTt.Destroy();
	}
	InitScroll(t, e, i = 0) {
		(this.uft = t),
			(this._Tt = e),
			this.eGe.RebuildLayoutByDataNew(t),
			this.SetSelectedIndex(i);
	}
	async CTt() {
		this.rTt ||
			((this.rTt = new DynamicMaskButton_1.DynamicMaskButton()),
			this.rTt.SetButtonFunction(this.dTt),
			await this.rTt.Init()),
			(this.RPr = this.RootActor.RootComponent.K2_GetComponentToWorld()),
			this.rTt.SetAttachChildItem(this.RootItem),
			this.rTt.SetActive(!0);
	}
	MTt() {
		this.rTt && (this.rTt.ResetItemParent(), this.rTt.SetActive(!1));
	}
	pTt(t) {
		t !== CommonDefine_1.INVALID_VALUE &&
			this.eGe.GetLayoutItemByKey(t).SetToggle(!1);
	}
	vTt() {
		var t = this._Tt(this.uft[this.oTt]),
			e = this.eGe.GetLayoutItemByIndex(this.oTt);
		this.uTt.ShowTemp(t, e), this.dTt();
	}
	TTt() {
		var t = this.GetItem(1);
		t.SetAnchorVAlign(3),
			t.SetPivot(new UE.Vector2D(0.5, 1)),
			t.SetAnchorOffsetX(0),
			t.SetAnchorOffsetY(0);
	}
	ITt() {
		var t = this.GetItem(1);
		t.SetAnchorVAlign(1),
			t.SetPivot(new UE.Vector2D(0.5, 0)),
			t.SetAnchorOffsetX(0),
			t.SetAnchorOffsetY(0);
	}
	SetSelectedIndex(t) {
		this.eGe.GetLayoutItemByKey(t).SetToggle(!0);
	}
	GetSelectedIndex() {
		return this.oTt;
	}
	SetShowType(t) {
		this.sTt !== t && ((this.sTt = t), (this.aTt = !0));
	}
	SetOnSelectCall(t) {
		this.nTt = t;
	}
	GetDropDownItemObject(t) {
		return this.eGe.GetLayoutItemByIndex(t);
	}
	GetDropDownItemList() {
		return this.eGe.GetLayoutItemList();
	}
	RefreshAllDropDownItem() {
		var t = this._Tt(this.uft[this.oTt]),
			e = this.eGe.GetLayoutItemByIndex(this.oTt);
		this.uTt.ShowTemp(t, e), this.eGe.RebuildLayoutByDataNew(this.uft);
	}
}
exports.CommonDropDown = CommonDropDown;
