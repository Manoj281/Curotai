import type { Schema, Struct } from '@strapi/strapi';

export interface ContentPartsBulletPara extends Struct.ComponentSchema {
  collectionName: 'components_content_parts_bullet_paras';
  info: {
    description: '';
    displayName: 'BulletPara';
  };
  attributes: {
    BulletPara: Schema.Attribute.Blocks;
  };
}

export interface ContentPartsBulletPoint extends Struct.ComponentSchema {
  collectionName: 'components_content_parts_bullet_points';
  info: {
    description: '';
    displayName: 'BulletPoint';
  };
  attributes: {
    Text: Schema.Attribute.Text;
  };
}

export interface ContentPartsContent extends Struct.ComponentSchema {
  collectionName: 'components_content_parts_contents';
  info: {
    description: '';
    displayName: 'Content';
  };
  attributes: {
    Bulletpara: Schema.Attribute.Component<'content-parts.bullet-para', true>;
    Paragraph: Schema.Attribute.Blocks;
    Title: Schema.Attribute.String;
  };
}

export interface ContentPartsMetric extends Struct.ComponentSchema {
  collectionName: 'components_content_parts_metrics';
  info: {
    displayName: 'Metric';
  };
  attributes: {
    Description: Schema.Attribute.String;
    Items: Schema.Attribute.Component<'content-parts.metric-item', true>;
    Title: Schema.Attribute.String;
  };
}

export interface ContentPartsMetricItem extends Struct.ComponentSchema {
  collectionName: 'components_content_parts_metric_items';
  info: {
    displayName: 'MetricItem';
  };
  attributes: {
    Title: Schema.Attribute.String;
    Value: Schema.Attribute.String;
  };
}

export interface ContentPartsSectionTitle extends Struct.ComponentSchema {
  collectionName: 'components_content_parts_section_titles';
  info: {
    displayName: 'SectionTitle';
  };
  attributes: {
    ConclusionTitle: Schema.Attribute.String;
    FollowUpTitle: Schema.Attribute.String;
    IntroductionTitle: Schema.Attribute.String;
    MetricsTitle: Schema.Attribute.String;
    TestimonialsTitle: Schema.Attribute.String;
    WhyChooseTitle: Schema.Attribute.String;
  };
}

export interface ContentPartsTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_content_parts_testimonials';
  info: {
    displayName: 'Testimonial';
  };
  attributes: {
    Company: Schema.Attribute.String;
    CompanyLogo: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    Content: Schema.Attribute.Text;
    Featured: Schema.Attribute.Boolean;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Name: Schema.Attribute.String;
    Order: Schema.Attribute.Integer;
    Title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content-parts.bullet-para': ContentPartsBulletPara;
      'content-parts.bullet-point': ContentPartsBulletPoint;
      'content-parts.content': ContentPartsContent;
      'content-parts.metric': ContentPartsMetric;
      'content-parts.metric-item': ContentPartsMetricItem;
      'content-parts.section-title': ContentPartsSectionTitle;
      'content-parts.testimonial': ContentPartsTestimonial;
    }
  }
}
