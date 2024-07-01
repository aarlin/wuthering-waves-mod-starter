"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TreasureBoxDetectorMarkItemView = void 0);
const UE = require("ue"),
	CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
	MarkDetectorRangeImageComponent_1 = require("./Components/MarkDetectorRangeImageComponent"),
	ServerMarkItemView_1 = require("./ServerMarkItemView");
class TreasureBoxDetectorMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
	constructor(e) {
		super(e),
			(this.KDi = void 0),
			(this.QDi = void 0),
			(this.XDi = void 0),
			(this.KDi = new UE.Vector());
	}
	async GetDetectorRangeComponentAsync() {
		return (
			this.QDi ||
				(this.QDi =
					new MarkDetectorRangeImageComponent_1.MarkDetectorRangeImageComponent()),
			this.XDi ||
				(this.XDi = this.QDi.CreateThenShowByResourceIdAsync(
					"UiItem_ProbeArea",
					this.RootItem,
					!0,
				)),
			await this.XDi,
			this.QDi
		);
	}
	OnInitialize() {
		super.OnInitialize(), this.OnIconPathChanged(this.Holder.IconPath);
		const e = CommonParamById_1.configCommonParamById.GetIntConfig(
			"TreasureBoxDetectionMaxDistance",
		);
		this.GetDetectorRangeComponentAsync().then((t) => {
			t.RangeImage.SetWidth((e / 100) * 2),
				t.RangeImage.SetHeight((e / 100) * 2),
				t.GetRootItem().SetHierarchyIndex(0),
				this.SetScale(this.Holder.MarkScale);
		});
	}
	SetScale(e) {
		this.KDi.Set(e, e, e),
			this.RootItem.SetWorldScale3D(this.KDi),
			this.GetDetectorRangeComponentAsync().then((e) => {
				this.KDi.Set(
					1 / this.RootItem.RelativeScale3D.X,
					1 / this.RootItem.RelativeScale3D.Y,
					1 / this.RootItem.RelativeScale3D.Z,
				),
					e.GetRootItem().SetRelativeScale3D(this.KDi);
			});
	}
	OnBeforeDestroy() {
		super.OnBeforeDestroy(),
			this.QDi?.Destroy(),
			(this.QDi = void 0),
			(this.XDi = void 0);
	}
}
exports.TreasureBoxDetectorMarkItemView = TreasureBoxDetectorMarkItemView;
