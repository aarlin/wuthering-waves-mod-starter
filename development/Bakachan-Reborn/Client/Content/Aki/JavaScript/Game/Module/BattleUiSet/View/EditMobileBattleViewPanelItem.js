"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EditMobileBattleViewPanelItem = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	BattleUiSetDefine_1 = require("../BattleUiSetDefine"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class EditMobileBattleViewPanelItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.wit = new UE.Vector()),
			(this.aCt = void 0),
			(this.sCt = void 0),
			(this.pCt = (t) => {
				var e, a;
				!this.PanelItemData ||
					!this.sCt ||
					2 <=
						ModelManager_1.ModelManager.BattleUiSetModel.GetTouchFingerDataCount() ||
					((e = t.GetLocalPointInPlane()),
					(t = t.dragComponent.GetOwner().GetActorScale3D()),
					(a = (e.X - this.sCt.X) * t.X),
					(t = (e.Y - this.sCt.Y) * t.Z),
					0 != a &&
						0 != t &&
						((this.aCt.X += a),
						(this.aCt.Y += t),
						(this.aCt.Z = 0),
						this.SetRelativeLocation(this.aCt),
						(this.sCt = e)));
			}),
			(this.vCt = (t) => {
				this.PanelItemData &&
					this.PanelItemData.CanEdit &&
					((this.sCt = t.GetLocalPointInPlane()),
					(this.aCt = this.RootItem.RelativeLocation),
					ModelManager_1.ModelManager.BattleUiSetModel.SetPanelItemSelected(
						this.PanelItemData,
					));
			}),
			(this.MCt = () => {
				this.sCt = void 0;
			}),
			(this.GCt = () => {
				this.PanelItemData && this.PanelItemData.CanEdit
					? ((this.sCt = void 0),
						ModelManager_1.ModelManager.BattleUiSetModel.SetPanelItemSelected(
							this.PanelItemData,
						))
					: ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"NotEdit",
						);
			}),
			(this.NCt = () => {
				this.sCt = void 0;
			}),
			(this.OCt = (t) => {
				this.PanelItemData &&
					this.PanelItemData.CanEdit &&
					1 === t &&
					ModelManager_1.ModelManager.BattleUiSetModel.SetPanelItemSelected(
						this.PanelItemData,
					);
			}),
			(this.kCt = () => {
				var t;
				return this.PanelItemData && this.PanelItemData.CanEdit
					? !(t =
							ModelManager_1.ModelManager.BattleUiSetModel
								.SelectedPanelItemData) ||
							t.ConfigId !== this.PanelItemData.ConfigId
					: (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"NotEdit",
						),
						!1);
			});
	}
	OnStart() {
		var t = this.OpenParam;
		this.aGe(t.PanelItemData, t.PanelItem, t.BattleViewBaseActor);
	}
	aGe(t, e, a) {
		(this.PanelItemData = t),
			(this.PanelItem = e),
			(this.qCt = a),
			(this.FCt = this.RootActor.GetComponentByClass(
				UE.UIDraggableComponent.StaticClass(),
			)),
			(this.VCt = this.RootActor.GetComponentByClass(
				UE.UIButtonComponent.StaticClass(),
			)),
			(this.b5e = this.RootActor.GetComponentByClass(
				UE.UIExtendToggle.StaticClass(),
			)),
			this.Ore(),
			t && this.Refresh();
	}
	OnBeforeDestroy() {
		this.kre(),
			(this.PanelItemData = void 0),
			(this.FCt = void 0),
			(this.VCt = void 0),
			(this.wit = void 0),
			(this.b5e = void 0),
			(this.qCt = void 0),
			(this.PanelItem = void 0);
	}
	Ore() {
		this.FCt &&
			(this.FCt.OnPointerDragCallBack.Bind(this.pCt),
			this.FCt.OnPointerBeginDragCallBack.Bind(this.vCt),
			this.FCt.OnPointerEndDragCallBack.Bind(this.MCt)),
			this.VCt &&
				(this.VCt.OnPointDownCallBack.Bind(this.GCt),
				this.VCt.OnPointUpCallBack.Bind(this.NCt)),
			this.b5e &&
				(this.b5e.OnStateChange.Add(this.OCt),
				this.b5e.CanExecuteChange.Bind(this.kCt));
	}
	kre() {
		this.FCt && this.FCt.OnPointerDragCallBack.Unbind(),
			this.VCt &&
				(this.VCt.OnPointDownCallBack.Unbind(),
				this.VCt.OnPointUpCallBack.Unbind()),
			this.b5e &&
				(this.b5e.OnStateChange.Remove(this.OCt),
				this.b5e.CanExecuteChange.Unbind());
	}
	SetRelativeLocation(t) {
		(t = this.HCt(t)),
			(this.PanelItemData.EditOffsetX = this.RootItem.GetAnchorOffsetX()),
			(this.PanelItemData.EditOffsetY = this.RootItem.GetAnchorOffsetY()),
			this.RootItem.K2_SetRelativeLocation(t, !1, void 0, !1);
	}
	GetRelativeLocation() {
		return this.aCt;
	}
	OnSave() {
		this.PanelItemData &&
			((this.PanelItemData.EditOffsetX = this.RootItem.GetAnchorOffsetX()),
			(this.PanelItemData.EditOffsetY = this.RootItem.GetAnchorOffsetY()));
	}
	HCt(t) {
		var e = this.RootActor.GetActorScale3D().X,
			a = (i = this.RootItem.GetPivot()).Y,
			i = i.X,
			s = (o = this.qCt.GetUIItem()).Width / 2,
			o = o.Height / 2,
			n = (h = this.RootItem.Width * e) * i - s,
			h = ((s = s - h * (1 - i)), (e = this.RootItem.Height * e) * a - o);
		i = o - e * (1 - a);
		return (
			(t.X = MathUtils_1.MathUtils.Clamp(t.X, n, s)),
			(t.Y = MathUtils_1.MathUtils.Clamp(t.Y, h, i)),
			t
		);
	}
	Refresh() {
		var t;
		this.PanelItemData &&
			((t = this.PanelItemData.Size),
			(this.wit.X = t),
			(this.wit.Y = t),
			(this.wit.Z = t),
			this.RootItem.SetUIItemScale(this.wit),
			this.RootItem.SetAnchorOffsetX(this.PanelItemData.OffsetX),
			this.RootItem.SetAnchorOffsetY(this.PanelItemData.OffsetY),
			this.RootItem.SetUIItemAlpha(this.PanelItemData.Alpha),
			this.RootItem.SetHierarchyIndex(this.PanelItemData.HierarchyIndex),
			(this.aCt = this.RootItem.RelativeLocation));
	}
	Reset() {
		var t;
		this.PanelItemData &&
			((t = this.PanelItemData.SourceSize),
			(this.wit.X = t),
			(this.wit.Y = t),
			(this.wit.Z = t),
			this.RootItem.SetUIItemScale(this.wit),
			this.RootItem.SetAnchorOffsetX(this.PanelItemData.SourceOffsetX),
			this.RootItem.SetAnchorOffsetY(this.PanelItemData.SourceOffsetY),
			this.RootItem.SetUIItemAlpha(this.PanelItemData.SourceAlpha),
			this.RootItem.SetHierarchyIndex(this.PanelItemData.SourceHierarchyIndex),
			(this.aCt = this.RootItem.RelativeLocation));
	}
	SetSelected(t) {
		this.b5e &&
			(t ? this.b5e.SetToggleState(1, !1) : this.b5e.SetToggleState(0, !1));
	}
	ApplyTopIndex() {
		this.GetRootItem().SetHierarchyIndex(
			BattleUiSetDefine_1.MAX_HIERACHY_INDEX,
		);
	}
}
exports.EditMobileBattleViewPanelItem = EditMobileBattleViewPanelItem;
