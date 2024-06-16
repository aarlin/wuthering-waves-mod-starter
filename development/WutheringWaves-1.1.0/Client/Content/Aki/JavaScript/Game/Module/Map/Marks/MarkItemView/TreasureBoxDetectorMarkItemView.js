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
			(this.cLi = void 0),
			(this.mLi = void 0),
			(this.dLi = void 0),
			(this.cLi = new UE.Vector());
	}
	async GetDetectorRangeComponentAsync() {
		return (
			this.mLi ||
				(this.mLi =
					new MarkDetectorRangeImageComponent_1.MarkDetectorRangeImageComponent()),
			this.dLi ||
				(this.dLi = this.mLi.CreateThenShowByResourceIdAsync(
					"UiItem_ProbeArea",
					this.RootItem,
					!0,
				)),
			await this.dLi,
			this.mLi
		);
	}
	OnInitialize() {
		super.OnInitialize(), this.OnIconPathChanged(this.Holder.IconPath);
		const t = CommonParamById_1.configCommonParamById.GetIntConfig(
			"TreasureBoxDetectionMaxDistance",
		);
		this.GetDetectorRangeComponentAsync().then(
			(e) => {
				e.RangeImage.SetWidth((t / 100) * 2),
					e.RangeImage.SetHeight((t / 100) * 2),
					e.GetRootItem().SetHierarchyIndex(0),
					this.SetScale(this.Holder.MarkScale);
			},
			void 0,
		);
	}
	SetScale(e, t = !0) {
		this.cLi.Set(e, e, e),
			t
				? this.RootItem.SetWorldScale3D(this.cLi)
				: this.RootItem.SetRelativeScale3D(this.cLi),
			this.GetDetectorRangeComponentAsync().then(
				(e) => {
					this.cLi.Set(
						1 / this.RootItem.RelativeScale3D.X,
						1 / this.RootItem.RelativeScale3D.Y,
						1 / this.RootItem.RelativeScale3D.Z,
					),
						e.GetRootItem().SetRelativeScale3D(this.cLi);
				},
				void 0,
			);
	}
	OnBeforeDestroy() {
		super.OnBeforeDestroy(),
			this.mLi?.Destroy(),
			(this.mLi = void 0),
			(this.dLi = void 0);
	}
}
exports.TreasureBoxDetectorMarkItemView = TreasureBoxDetectorMarkItemView;
//# sourceMappingURL=TreasureBoxDetectorMarkItemView.js.map
